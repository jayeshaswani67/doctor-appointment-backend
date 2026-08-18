import { Router } from "express";

import {
  SlotController,
} from "../controllers/slot.controller";

const router = Router();

router.get(
  "/",
  SlotController.getSlots
);

router.get(
  "/:id",
  SlotController.getSlotById
);

router.post(
  "/",
  SlotController.createSlot
);

router.put(
  "/:id",
  SlotController.updateSlot
);

router.delete(
  "/:id",
  SlotController.deleteSlot
);

export default router;