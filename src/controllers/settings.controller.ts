import { Request, Response } from "express";
import { SettingsService } from "../services/settings.service";

export const getSettings = async (
  req: Request,
  res: Response
) => {
  try {
    const data =
      await SettingsService.getSettings();

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error: unknown) {
    console.error("Get Settings Error:", error);

    const message =
      error instanceof Error
        ? error.message
        : "Failed to get settings";

    return res.status(500).json({
      success: false,
      message,
    });
  }
};


export const saveSettings = async (
  req: Request,
  res: Response
) => {
  try {
    const data =
      await SettingsService.saveSettings(
        req.body
      );

    return res.status(200).json({
      success: true,
      message: "Settings saved successfully",
      data,
    });
  } catch (error: unknown) {
    console.error("Save Settings Error:", error);

    const message =
      error instanceof Error
        ? error.message
        : "Failed to save settings";

    return res.status(500).json({
      success: false,
      message,
    });
  }
};