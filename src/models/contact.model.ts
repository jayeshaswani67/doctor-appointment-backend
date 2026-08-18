import mongoose from "mongoose";

export interface IContact extends Document {
  name: string;
  email: string;
  mobile: string;
  subject: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}

const contactSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    mobileNumber: {
      type: String,
      required: true,
    },

    subject: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Contact",
  contactSchema
);