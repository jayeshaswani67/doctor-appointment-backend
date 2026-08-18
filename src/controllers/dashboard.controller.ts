import { Request, Response } from "express";
import { DashboardService } from "../services/dashboard.service";

export class DashboardController {

  static async getDashboard(
    req: Request,
    res: Response
  ) {

    try {

      const data =
        await DashboardService.getDashboard();

      return res.status(200).json({

        success: true,

        data,

      });

    } catch (error: any) {

      console.error(
        "Dashboard API Error:",
        error
      );

      return res.status(500).json({

        success: false,

        message:
          error.message ||
          "Failed to load dashboard",

      });

    }
  }
}