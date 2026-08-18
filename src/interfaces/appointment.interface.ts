export interface IAppointment {

  id: string;

  patientName: string;

  mobileNumber: string;

  appointmentDate: string;

  appointmentTime: string;

  status:
    | "Booked"
    | "Completed"
    | "Cancelled";

  createdAt: Date;
}