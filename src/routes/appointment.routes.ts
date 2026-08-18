import { Router } from "express";
import { AppointmentController } from "../controllers/appointment.controller";

const router = Router();

router.post(
  "/",
  AppointmentController.createAppointment
);

router.get(
  "/",
  AppointmentController.getAppointments
);

router.put(
  "/:id/status",
  AppointmentController.updateAppointmentStatus
);

export default router;