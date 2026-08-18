import {
  Request,
  Response,
  NextFunction,
} from "express";

import {
  SlotService,
} from "../services/slot.service";

export class SlotController {

  // =========================
  // POST /api/slots
  // =========================

  static async createSlot(
    req: Request,
    res: Response,
    next: NextFunction
  ) {

    try {

      const slot =
        await SlotService.createSlot(
          req.body
        );

      return res.status(201).json({

        success: true,

        message:
          "Slot created successfully.",

        data: slot,

      });

    } catch (error) {

      next(error);

    }
  }


  // =========================
  // GET /api/slots
  // =========================

  static async getSlots(
    req: Request,
    res: Response,
    next: NextFunction
  ) {

    try {

      const page =
        Math.max(
          Number(req.query.page) || 1,
          1
        );

      const limit =
        Math.max(
          Number(req.query.limit) || 10,
          1
        );

      const result =
        await SlotService.getSlots(
          page,
          limit
        );

      return res.status(200).json({

        success: true,

        message:
          "Slots fetched successfully.",

        data: result.data,

        pagination:
          result.pagination,

      });

    } catch (error) {

      next(error);

    }
  }


  // =========================
  // GET SINGLE SLOT
  // =========================

  static async getSlotById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {

    try {

      const slot =
        await SlotService.getSlotById(
          req.params.id as string
        );

      return res.status(200).json({

        success: true,

        message:
          "Slot fetched successfully.",

        data: slot,

      });

    } catch (error) {

      next(error);

    }
  }


  // =========================
  // PUT /api/slots/:id
  // =========================

  static async updateSlot(
    req: Request,
    res: Response,
    next: NextFunction
  ) {

    try {

      const slot =
        await SlotService.updateSlot(
          req.params.id as string,
          req.body
        );

      return res.status(200).json({

        success: true,

        message:
          "Slot updated successfully.",

        data: slot,

      });

    } catch (error) {

      next(error);

    }
  }


  // =========================
  // DELETE /api/slots/:id
  // =========================

  static async deleteSlot(
    req: Request,
    res: Response,
    next: NextFunction
  ) {

    try {

      await SlotService.deleteSlot(
        req.params.id as string
      );

      return res.status(200).json({

        success: true,

        message:
          "Slot deleted successfully.",

      });

    } catch (error) {

      next(error);

    }
  }
}