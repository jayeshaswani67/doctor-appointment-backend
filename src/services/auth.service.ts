import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import Doctor from "../models/profile.model";

export class AuthService {

  // login
  static async login(
    email: string,
    password: string
  ) {

    email = email.trim().toLowerCase();

    const doctor = await Doctor.findOne({ email });

    if (!doctor) {
      throw new Error("Doctor not found.");
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      doctor.password
    );

    if (!isPasswordValid) {
      throw new Error("Invalid email or password.");
    }

    const token = jwt.sign(
      {
        id: doctor._id,
        email: doctor.email,
        role: "doctor",
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1d",
      }
    );

    return {
      token,
      doctor: {
        _id: doctor._id,
        name: doctor.name,
        email: doctor.email,
        mobile: doctor.mobile,
        specialization: doctor.specialization,
        qualification: doctor.qualification,
        clinic: doctor.clinic,
        experience: doctor.yearsofexperience,
        address: doctor.address,
        workingTime: doctor.workingTime,
      },
    };
  }
// forget password
  static async forgotPassword(email: string) {

    email = email.trim().toLowerCase();

    const doctor = await Doctor.findOne({ email });

    if (!doctor) {
      throw new Error("Doctor not found.");
    }

    const token = jwt.sign(
      {
        id: doctor._id,
        email: doctor.email,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "15m",
      }
    );

    doctor.resetToken = token;
    doctor.resetTokenExpiry = new Date(
      Date.now() + 15 * 60 * 1000
    );

    await doctor.save();

    console.log("========== RESET TOKEN ==========");
    console.log("Doctor :", doctor.name);
    console.log("Email  :", doctor.email);
    console.log("UserId :", doctor._id);
    console.log("Token  :", token);
    console.log("=================================");

    return {
      success: true,
      token,
    };
  }

//  reset password
  static async resetPassword(
    userId: string,
    token: string,
    password: string
  ) {

    const doctor = await Doctor.findById(userId);

    if (!doctor) {
      throw new Error("Doctor not found.");
    }

    if (!doctor.resetToken) {
      throw new Error("Reset token not found.");
    }

    if (doctor.resetToken !== token) {
      throw new Error("Invalid reset token.");
    }

    if (
      !doctor.resetTokenExpiry ||
      doctor.resetTokenExpiry.getTime() < Date.now()
    ) {
      throw new Error("Reset token has expired.");
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as {
      id: string;
      email: string;
    };

    if (decoded.id !== doctor._id.toString()) {
      throw new Error("Invalid reset link.");
    }

    doctor.password = await bcrypt.hash(password, 10);

    doctor.resetToken = null;
    doctor.resetTokenExpiry = null;

    await doctor.save();

    return {
      success: true,
      message: "Password reset successfully.",
    };
  }
}