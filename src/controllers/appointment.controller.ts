import { Request, Response, NextFunction } from "express";

import { AppointmentService } from "../services/appointment.service";

export class AppointmentController {
  // Create Appointment
  static async createAppointment(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const appointment = await AppointmentService.createAppointment(req.body);

      return res.status(201).json({
        success: true,

        message:
          "Appointment booked successfully! Your appointment has been confirmed.",

        data: {
          appointment,
          token: appointment.token,

          confirmationMessage:
            `Appointment booked successfully! ` +
            `Your appointment has been confirmed. ` +
            `Your token number is #${appointment.token}. ` +
            `Please arrive on time and keep your token number with you.`,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  // Get All Appointments
  static async getAppointments(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;

      const result = await AppointmentService.getAppointments(page, limit);

      return res.status(200).json({
        success: true,
        message: "Appointments fetched successfully",

        data: result.data,

        pagination: result.pagination,
      });
    } catch (error) {
      next(error);
    }
  }
  // put the appointment status
  static async updateAppointmentStatus(req: any, res: any) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const appointment =
      await AppointmentService.updateAppointmentStatus(
        id,
        status
      );

    return res.status(200).json({
      success: true,
      message:
        "Appointment status updated successfully.",
      data: appointment,
    });

  } catch (error: any) {
    console.error(
      "UPDATE APPOINTMENT STATUS ERROR:",
      error
    );

    return res.status(
      error.statusCode || 500
    ).json({
      success: false,
      message:
        error.message ||
        "Failed to update appointment status.",
    });
  }
}
}
