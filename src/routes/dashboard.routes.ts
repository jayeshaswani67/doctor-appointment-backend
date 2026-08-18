import { Router } from "express";
import { DashboardController } from "../controllers/dashboard.controller";

const router = Router();

// Dashboard
router.get("/",
     DashboardController.getDashboard);


export default router;