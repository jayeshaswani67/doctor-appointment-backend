import Slot from "../models/slot.model";

export class SlotService {

  
  // CREATE SLOT
  

  static async createSlot(data: any) {

    const {
      date,
      startTime,
      endTime,
    } = data;

    if (!date || !startTime || !endTime) {
      const error: any = new Error(
        "Date, start time and end time are required."
      );

      error.statusCode = 400;

      throw error;
    }

    // Prevent duplicate slot
    const existingSlot =
      await Slot.findOne({
        date,
        startTime,
      });

    if (existingSlot) {
      const error: any = new Error(
        "This slot already exists."
      );

      error.statusCode = 409;

      throw error;
    }

    const slot = await Slot.create({
      date,
      startTime,
      endTime,
      status: "Available",
    });

    return slot.toObject();
  }


  
  // GET ALL SLOTS
  

  static async getSlots(
    page = 1,
    limit = 10
  ) {

    const skip =
      (page - 1) * limit;

    const slots =
      await Slot.find({})
        .sort({
          date: 1,
          startTime: 1,
        })
        .skip(skip)
        .limit(limit)
        .lean();

    const total =
      await Slot.countDocuments();

    return {
      data: slots,

      pagination: {
        page,
        limit,
        total,
        totalPages:
          Math.ceil(total / limit),
      },
    };
  }


  
  // GET SINGLE SLOT
  

  static async getSlotById(
    id: string
  ) {

    const slot =
      await Slot.findById(id).lean();

    if (!slot) {

      const error: any =
        new Error(
          "Slot not found."
        );

      error.statusCode = 404;

      throw error;
    }

    return slot;
  }


  
  // UPDATE SLOT
  

  static async updateSlot(
    id: string,
    data: any
  ) {

    const {
      date,
      startTime,
      endTime,
      status,
    } = data;

    const slot =
      await Slot.findById(id);

    if (!slot) {

      const error: any =
        new Error(
          "Slot not found."
        );

      error.statusCode = 404;

      throw error;
    }

    // Update only supplied fields

    if (date !== undefined) {
      slot.date = date;
    }

    if (
      startTime !== undefined
    ) {
      slot.startTime =
        startTime;
    }

    if (
      endTime !== undefined
    ) {
      slot.endTime =
        endTime;
    }

    if (
      status !== undefined
    ) {
      slot.status = status;
    }

    await slot.save();

    return slot.toObject();
  }


  
  // DELETE SLOT
  

  static async deleteSlot(
    id: string
  ) {

    const slot =
      await Slot.findById(id);

    if (!slot) {

      const error: any =
        new Error(
          "Slot not found."
        );

      error.statusCode = 404;

      throw error;
    }

    await Slot.findByIdAndDelete(id);

    return {
      _id: id,
    };
  }
}