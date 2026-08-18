import Appointment from "../models/appointment.model";
import Profile from "../models/profile.model";

export class AppointmentService {

  
  // CREATE APPOINTMENT
  

  static async createAppointment(data: any) {

    const {
      appointmentDate,
      time,
    } = data;

    if (!appointmentDate) {
      const error: any = new Error(
        "Appointment date is required."
      );

      error.statusCode = 400;
      throw error;
    }

    if (!time) {
      const error: any = new Error(
        "Appointment time is required."
      );

      error.statusCode = 400;
      throw error;
    }


    
    // CHECK SLOT ALREADY BOOKED
    

    const existingAppointment =
      await Appointment.findOne({
        appointmentDate,
        time,
        status: {
          $ne: "Cancelled",
        },
      }).lean();


    if (existingAppointment) {

      const error: any = new Error(
        "This appointment slot is already booked. Please select another time."
      );

      error.statusCode = 409;

      throw error;
    }


    
    // GET DOCTOR
    

    const doctor =
      await Profile.findOne().lean();


    if (!doctor) {

      const error: any = new Error(
        "Doctor profile not found."
      );

      error.statusCode = 404;

      throw error;
    }


    
    // GENERATE ALL SLOTS FOR THIS DATE
    

    const slots =
      this.generateDaySlots(
        doctor,
        appointmentDate
      );


    
    // FIND SELECTED SLOT
    

    const selectedIndex =
      slots.findIndex(
        (slot) =>
          slot.startTime === time
      );


    if (selectedIndex === -1) {

      const error: any = new Error(
        "Selected appointment slot is invalid."
      );

      error.statusCode = 400;

      throw error;
    }


    
    // TOKEN = SLOT POSITION + 1
    

    const token =
      selectedIndex + 1;


    
    // CREATE APPOINTMENT
    

    const appointment =
      await Appointment.create({

        ...data,

        token,

        status: "Booked",

      });


    return appointment;
  }


  
  // GENERATE DAY SLOTS
  

  private static generateDaySlots(
    doctor: any,
    date: string
  ) {

    const weekday =
      new Date(
        `${date}T12:00:00`
      ).toLocaleDateString(
        "en-US",
        {
          weekday: "long",
        }
      );


    const workingDay =
      doctor.workingHours?.find(
        (item: any) =>
          item.day === weekday &&
          item.enabled === true
      );


    if (!workingDay) {
      return [];
    }


    const duration =
      doctor.slotDuration || 15;


    const slots: any[] = [];


    
    // MORNING
    

    if (
      workingDay.morningStart &&
      workingDay.morningEnd
    ) {

      this.generateSlots(
        slots,
        workingDay.morningStart,
        workingDay.morningEnd,
        duration
      );
    }


    
    // EVENING
    

    if (
      workingDay.eveningStart &&
      workingDay.eveningEnd
    ) {

      this.generateSlots(
        slots,
        workingDay.eveningStart,
        workingDay.eveningEnd,
        duration
      );
    }


    return slots;
  }


  
  // GENERATE SLOTS
  

  private static generateSlots(
    slots: any[],
    start: string,
    end: string,
    duration: number
  ) {

    let [
      hour,
      minute,
    ] =
      start
        .split(":")
        .map(Number);


    const [
      endHour,
      endMinute,
    ] =
      end
        .split(":")
        .map(Number);


    const endTotal =
      endHour * 60 +
      endMinute;


    while (
      hour * 60 + minute <
      endTotal
    ) {

      const currentTotal =
        hour * 60 + minute;


      const nextTotal =
        currentTotal + duration;


      if (
        nextTotal > endTotal
      ) {
        break;
      }


      slots.push({
        startTime:
          this.formatTime(
            hour,
            minute
          ),

        startTime24:
          `${String(hour).padStart(
            2,
            "0"
          )}:${String(minute).padStart(
            2,
            "0"
          )}`,
      });


      hour =
        Math.floor(
          nextTotal / 60
        );

      minute =
        nextTotal % 60;
    }
  }


  
  // FORMAT TIME
  

  private static formatTime(
    hour: number,
    minute: number
  ) {

    const suffix =
      hour >= 12
        ? "PM"
        : "AM";


    const displayHour =
      hour % 12 || 12;


    return `${displayHour}:${String(
      minute
    ).padStart(2, "0")} ${suffix}`;
  }


  
  // GET APPOINTMENTS
  

  static async getAppointments(
    page = 1,
    limit = 10
  ) {

    const skip =
      (page - 1) * limit;


    const appointments =
      await Appointment.find()
        .sort({
          appointmentDate: 1,
          time: 1,
        })
        .skip(skip)
        .limit(limit)
        .lean();


    const total =
      await Appointment.countDocuments();


    return {

      data:
        appointments.map(
          (appointment) => ({

            _id:
              appointment._id,

            appointmentDate:
              appointment.appointmentDate,

            time:
              appointment.time,

            token:
              appointment.token,

            patientName:
              appointment.patientName,

            mobileNumber:
              appointment.mobileNumber,

            status:
              appointment.status,

          })
        ),

      pagination: {

        page,

        limit,

        total,

        totalPages:
          Math.ceil(
            total / limit
          ),

      },

    };
  }

  static async updateAppointmentStatus(
  id: string,
  status: string
) {
  const allowedStatuses = [
    "Booked",
    "Completed",
    "Cancelled",
  ];

  if (!allowedStatuses.includes(status)) {
    const error: any = new Error(
      "Invalid appointment status."
    );

    error.statusCode = 400;

    throw error;
  }

  const appointment =
    await Appointment.findByIdAndUpdate(
      id,
      {
        status,
      },
      {
        new: true,
        runValidators: true,
      }
    ).lean();

  if (!appointment) {
    const error: any = new Error(
      "Appointment not found."
    );

    error.statusCode = 404;

    throw error;
  }

  return appointment;
}
}