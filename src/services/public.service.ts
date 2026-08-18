import Profile from "../models/profile.model";
import Appointment from "../models/appointment.model";

export class PublicService {
  static async getLandingPage() {
    // get profile

    const doctor = await Profile.findOne().lean();

    if (!doctor) {
      const error: any = new Error("Doctor profile not found");

      error.statusCode = 404;
      throw error;
    }

    //  real time

    const today = this.getIndiaDate(0);
    const tomorrow = this.getIndiaDate(1);
    const nextDay = this.getIndiaDate(2);

    // appointment slots

    const todayData = await this.getDaySlots(doctor, today);

    const tomorrowData = await this.getDaySlots(doctor, tomorrow);

    const nextDayData = await this.getDaySlots(doctor, nextDay);

    // doctor information

    const doctorInfo = {
      id: doctor._id,

      name: doctor.name || "",

      title: doctor.title || "",

      specialization: doctor.specialization || "",

      qualifications: doctor.qualification || "",

      yearsOfExperience: doctor.yearsofexperience || 0,

      consultationFees: {
        amount: doctor.consultationFees?.amount || 0,

        currency: doctor.consultationFees?.currency || "INR",

        formatted: `₹${doctor.consultationFees?.amount || 0} / consultation`,
      },

      bio: doctor.bio || "",

      image: {
        url: doctor.image?.url || "",

        altText: doctor.image?.altText || doctor.name || "Doctor",
      },

      contactInfo: doctor.contactInfo || {},

      call: {
        phone:
          doctor.contactInfo?.phone ||
          doctor.contactInfo?.mobile ||
          doctor.contactInfo?.mobileNumber ||
          "",

        tel:
          doctor.contactInfo?.phone ||
          doctor.contactInfo?.mobile ||
          doctor.contactInfo?.mobileNumber ||
          "",
      },

      workingHours: this.formatWorkingHours(doctor.workingHours || []),
    };

    // response

    return {
      doctorInfo,

      appointments: {
        today: todayData,
        tomorrow: tomorrowData,
        nextDay: nextDayData,
      },
    };
  }

  private static formatWorkingHours(workingHours: any[]) {
    const result: any[] = [];

    const mondayToSaturday = workingHours.filter((item: any) =>
      [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ].includes(item.day),
    );

    if (mondayToSaturday.length > 0) {
      const firstDay = mondayToSaturday.find(
        (item: any) => item.enabled === true,
      );

      if (firstDay) {
        result.push({
          days: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],

          enabled: true,

          morningTime:
            firstDay.morningStart && firstDay.morningEnd
              ? `${this.formatTimeString(
                  firstDay.morningStart,
                )} - ${this.formatTimeString(firstDay.morningEnd)}`
              : "",

          eveningTime:
            firstDay.eveningStart && firstDay.eveningEnd
              ? `${this.formatTimeString(
                  firstDay.eveningStart,
                )} - ${this.formatTimeString(firstDay.eveningEnd)}`
              : "",
        });
      }
    }

    const sunday = workingHours.find((item: any) => item.day === "Sunday");

    if (sunday) {
      result.push({
        days: ["Sunday"],

        enabled: sunday.enabled === true,

        morningTime:
          sunday.morningStart && sunday.morningEnd
            ? `${this.formatTimeString(
                sunday.morningStart,
              )} - ${this.formatTimeString(sunday.morningEnd)}`
            : "",

        eveningTime:
          sunday.eveningStart && sunday.eveningEnd
            ? `${this.formatTimeString(
                sunday.eveningStart,
              )} - ${this.formatTimeString(sunday.eveningEnd)}`
            : "",
      });
    }

    return result;
  }

  private static getIndiaDate(daysToAdd: number): string {
    const now = new Date();

    const indiaTime = new Date(
      now.toLocaleString("en-US", {
        timeZone: "Asia/Kolkata",
      }),
    );

    indiaTime.setDate(indiaTime.getDate() + daysToAdd);

    const year = indiaTime.getFullYear();

    const month = String(indiaTime.getMonth() + 1).padStart(2, "0");

    const day = String(indiaTime.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  private static async getDaySlots(doctor: any, date: string) {
    const weekday = new Date(`${date}T12:00:00`).toLocaleDateString("en-US", {
      weekday: "long",
    });

    const workingDay = doctor.workingHours?.find(
      (item: any) => item.day === weekday && item.enabled === true,
    );

    if (!workingDay) {
      return {
        date,
        availableSlots: [],
        bookedSlots: [],
      };
    }

    const slotDuration = doctor.slotDuration || 15;

    const generatedSlots: any[] = [];

    // MORNING
    if (workingDay.morningStart && workingDay.morningEnd) {
      this.generateSlots(
        generatedSlots,
        date,
        workingDay.morningStart,
        workingDay.morningEnd,
        slotDuration,
      );
    }

    // EVENING
    if (workingDay.eveningStart && workingDay.eveningEnd) {
      this.generateSlots(
        generatedSlots,
        date,
        workingDay.eveningStart,
        workingDay.eveningEnd,
        slotDuration,
      );
    }

    const now = new Date();

    const indiaNow = new Date(
      now.toLocaleString("en-US", {
        timeZone: "Asia/Kolkata",
      }),
    );

    const today = this.getIndiaDate(0);

    let futureSlots = generatedSlots;

    if (date === today) {
      const currentMinutes = indiaNow.getHours() * 60 + indiaNow.getMinutes();

      futureSlots = generatedSlots.filter((slot) => {
        const [hours, minutes] = slot.startTime24.split(":").map(Number);

        const slotMinutes = hours * 60 + minutes;

        return slotMinutes > currentMinutes;
      });
    }

    const appointments = await Appointment.find({
      appointmentDate: date,

      status: {
        $ne: "Cancelled",
      },
    }).lean();

    const availableSlots: any[] = [];
    const bookedSlots: any[] = [];

    for (const slot of futureSlots) {
      const booked = appointments.some(
        (appointment: any) => appointment.time === slot.startTime,
      );

      if (booked) {
        bookedSlots.push({
          startTime: slot.startTime,

          endTime: slot.endTime,
        });
      } else {
        availableSlots.push({
          startTime: slot.startTime,

          endTime: slot.endTime,
        });
      }
    }

    return {
      date,
      availableSlots,
      bookedSlots,
    };
  }

  private static generateSlots(
    slots: any[],
    date: string,
    start: string,
    end: string,
    duration: number,
  ) {
    let [hour, minute] = start.split(":").map(Number);

    const [endHour, endMinute] = end.split(":").map(Number);

    const endTotal = endHour * 60 + endMinute;

    while (hour * 60 + minute < endTotal) {
      const currentTotal = hour * 60 + minute;

      const nextTotal = currentTotal + duration;

      if (nextTotal > endTotal) {
        break;
      }

      const endH = Math.floor(nextTotal / 60);

      const endM = nextTotal % 60;

      slots.push({
        date,

        startTime24: `${String(hour).padStart(2, "0")}:${String(
          minute,
        ).padStart(2, "0")}`,

        startTime: this.formatTime(hour, minute),

        endTime: this.formatTime(endH, endM),
      });

      hour = Math.floor(nextTotal / 60);

      minute = nextTotal % 60;
    }
  }

  private static formatTimeString(time?: string): string {
    if (!time) return "";

    const [hourString, minuteString] = time.split(":");

    const hour = Number(hourString);
    const minute = Number(minuteString);

    if (Number.isNaN(hour) || Number.isNaN(minute)) {
      return time;
    }

    const suffix = hour >= 12 ? "PM" : "AM";

    const displayHour = hour % 12 || 12;

    return `${displayHour}:${String(minute).padStart(2, "0")} ${suffix}`;
  }

  private static formatTime(hour: number, minute: number): string {
    const suffix = hour >= 12 ? "PM" : "AM";

    const displayHour = hour % 12 || 12;

    return `${displayHour}:${String(minute).padStart(2, "0")} ${suffix}`;
  }
}
