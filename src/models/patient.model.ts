import mongoose, { Schema, Document } from "mongoose";

export interface IPatient extends Document {
  patientName: string;
  age: number;
  gender: string;
  mobileNumber: string;
  status: "Pending" | "Completed" | "Cancelled";
}

const patientSchema = new Schema<IPatient>(
  {
    patientName: {
      type: String,
      required: true,
      trim: true,
    },

    age: {
      type: Number,
      required: true,
    },

    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female", "Other"],
    },

    mobileNumber: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "Completed",
        "Cancelled",
      ],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

const Patient = mongoose.model<IPatient>(
  "Patient",
  patientSchema
);

export default Patient;