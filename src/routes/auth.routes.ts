import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";

const router = Router();

router.post("/login", AuthController.login);


router.post(
  "/forgot-password",
  AuthController.forgotPassword
);


router.post(
  "/reset-password/:userId/:token",
  AuthController.resetPassword
);

export default router;