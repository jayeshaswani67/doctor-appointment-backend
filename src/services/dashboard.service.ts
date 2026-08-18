import Appointment from "../models/appointment.model";

export class DashboardService {
  static async getDashboard() {
  const totalAppointments =
    await Appointment.countDocuments();

  const pendingAppointments =
    await Appointment.countDocuments({
      status: "Booked",
    });

  const completedAppointments =
    await Appointment.countDocuments({
      status: "Completed",
    });

  const cancelledAppointments =
    await Appointment.countDocuments({
      status: "Cancelled",
    });

  const totalPatients =
    await Appointment.distinct("mobileNumber");

  const appointments =
    await Appointment.find()
      .sort({
        appointmentDate: 1,
        time: 1,
      })
      .limit(10)
      .lean();

  return {
    totalAppointments,

    totalPatients: totalPatients.length,

    pendingAppointments,

    completedAppointments,

    cancelledAppointments,

    appointments: appointments.map(
      (appointment) => ({
        id: appointment._id,
        patientName:
          appointment.patientName,
        mobileNumber:
          appointment.mobileNumber,
        appointmentDate:
          appointment.appointmentDate,
        time: appointment.time,
        status:
          appointment.status,
      })
    ),
  };
}
}
