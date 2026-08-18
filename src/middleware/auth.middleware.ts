import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import Doctor from "../models/profile.model";

export interface AuthRequest extends Request {
  doctor?: any;
}

export const authenticateDoctor = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {

  try {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Access token required.",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded: any = jwt.verify(
      token,
      process.env.JWT_SECRET!
    );

    const doctor = await Doctor.findById(decoded.doctorId);

    if (!doctor) {
      return res.status(401).json({
        success: false,
        message: "Doctor not found.",
      });
    }

    req.doctor = doctor;

    next();

  } catch {

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });

  }
};