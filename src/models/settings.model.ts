import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema(
  {
    workingDays: {
      type: String,
      required: true,
    },
    slotDuration: {
      type: Number,
      required: true,
    },
    morningStart: {
      type: String,
      required: true,
    },
    morningEnd: {
      type: String,
      required: true,
    },
    eveningStart: {
      type: String,
      required: true,
    },
    eveningEnd: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Settings", settingsSchema);