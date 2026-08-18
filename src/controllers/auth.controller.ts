import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/auth.service";

export class AuthController {

// login api
   static async login(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {

    const { email, password } = req.body;

    const result = await AuthService.login(
      email,
      password
    );

    return res.status(200).json(result);

  } catch (error) {
    next(error);
  }
}


//  forget password
  static async forgotPassword(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { email }= req.body;
      console.log(email);

      if (!email) {
        return res.status(400).json({
          success: false,
          message: "Email is required."
        });
      }

      await AuthService.forgotPassword(email);

      return res.status(200).json({
        success: true,
        message: "Password reset link sent successfully."
      });

    } catch (error) {
      next(error);
    }
  }


 // Reset Password
static async resetPassword(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { userId, token } = req.params;

    const {
      password,
      confirmPassword,
    } = req.body;

    // Required Fields
    if (
      !userId ||
      !token
    ) {
      return res.status(400).json({
        success: false,
        message:
          "User ID, token are required.",
      });
    }


    await AuthService.resetPassword(
      userId as string,
      token as string,
      password
    );

    return res.status(200).json({
      success: true,
      message: "Password reset successfully.",
    });

  } catch (error) {
    next(error);
  }
}
}
