import { Router } from "express";

import {
  ProfileController,
} from "../controllers/profile.controller";

import {
  uploadDoctorImage,
} from "../middleware/upload.middleware";

const router = Router();

router.get(
  "/",
  ProfileController.getProfile
);

router.put(
  "/",
  ProfileController.updateProfile
);

router.post(
  "/image",
  uploadDoctorImage.single("image"),
  ProfileController.upload
);

export default router;