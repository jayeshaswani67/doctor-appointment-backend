import mongoose, {
  Schema,
  Document,
} from "mongoose";

export interface ISlot extends Document {
  date: string;
  startTime: string;
  endTime: string;
  status: "Available" | "Booked" | "Blocked";
}

const slotSchema =
  new Schema<ISlot>(
    {
      date: {
        type: String,
        required: true,
      },

      startTime: {
        type: String,
        required: true,
      },

      endTime: {
        type: String,
        required: true,
      },

      status: {
        type: String,
        enum: [
          "Available",
          "Booked",
          "Blocked",
        ],
        default: "Available",
      },
    },
    {
      timestamps: true,
    }
  );

export default mongoose.model<ISlot>(
  "Slot",
  slotSchema
);