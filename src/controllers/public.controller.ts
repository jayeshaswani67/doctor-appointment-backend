import { Request, Response } from "express";
import { PublicService } from "../services/public.service";

export const getLandingPage = async (
  req: Request,
  res: Response
) => {

  try {

    const data =
      await PublicService.getLandingPage();

    return res.status(200).json({
      success: true,
      data,
    });

  } catch (error: any) {

    console.error(
      "Landing API Error:",
      error
    );

    return res.status(
      error.statusCode || 500
    ).json({
      success: false,
      message:
        error.message ||
        "Failed to fetch landing page",
    });
  }
};