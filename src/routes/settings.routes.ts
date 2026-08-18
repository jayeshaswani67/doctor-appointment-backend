import { Router } from "express";
import {
  saveSettings,
  getSettings,
} from "../controllers/settings.controller";

const router = Router();

router.get("/", getSettings);
router.put("/", saveSettings);

export default router;