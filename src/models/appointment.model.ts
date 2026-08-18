import mongoose, {
  Document,
  Schema,
} from "mongoose";

export interface IAppointment extends Document {
  patientName: string;
  mobileNumber: string;
  email?: string;
  appointmentDate: Date;
  time: string;
  token: number;
  status: "Booked" | "Completed" | "Cancelled";
}

const appointmentSchema =
  new Schema<IAppointment>(
    {
      patientName: {
        type: String,
        required: true,
        trim: true,
      },

      mobileNumber: {
        type: String,
        required: true,
        trim: true,
      },

      email: {
        type: String,
        trim: true,
      },

      appointmentDate: {
        type: Date,
        required: true,
      },

      time: {
        type: String,
        required: true,
      },

      token: {
        type: Number,
        required: true,
      },

      status: {
        type: String,
        enum: [
          "Booked",
          "Completed",
          "Cancelled",
        ],
        default: "Booked",
      },
    },
    {
      timestamps: true,
    }
  );

export default mongoose.model<IAppointment>(
  "Appointment",
  appointmentSchema
);