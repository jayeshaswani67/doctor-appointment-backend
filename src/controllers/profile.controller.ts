import { Request, Response } from "express";
import { ProfileService } from "../services/profile.service";

export class ProfileController {

//  get profile

  static async getProfile(
    req: Request,
    res: Response
  ) {
    try {

      const profile =
        await ProfileService.getProfile();

      res.status(200).json({
        success: true,
        data: profile,
      });

    } catch (error: any) {

      console.error(
        "GET PROFILE ERROR:",
        error
      );

      res.status(
        error.statusCode || 500
      ).json({
        success: false,
        message:
          error.message ||
          "Failed to get profile",
      });
    }
  }


// updtae profile

  static async updateProfile(
    req: Request,
    res: Response
  ) {
    try {

      const profile =
        await ProfileService.updateProfile(
          req.body
        );

      res.status(200).json({
        success: true,
        message:
          "Profile updated successfully",
        data: profile,
      });

    } catch (error: any) {

      console.error(
        "UPDATE PROFILE ERROR:",
        error
      );

      res.status(
        error.statusCode || 500
      ).json({
        success: false,
        message:
          error.message ||
          "Failed to update profile",
      });
    }
  }


// upload doctor image

  static async upload(
    req: Request,
    res: Response
  ) {
    try {

      console.log(
        "UPLOADED FILE:",
        req.file
      );

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message:
            "Doctor image is required",
        });
      }

      const profile =
        await ProfileService.upload(
          req.file
        );

      res.status(200).json({
        success: true,

        message:
          "Doctor image uploaded successfully",

        data: profile,
      });

    } catch (error: any) {

      console.error(
        "UPLOAD DOCTOR IMAGE ERROR:",
        error
      );

      res.status(
        error.statusCode || 500
      ).json({
        success: false,
        message:
          error.message ||
          "Failed to upload doctor image",
      });
    }
  }
}