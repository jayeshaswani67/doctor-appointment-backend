import Profile from "../models/profile.model";
import Slot from "../models/slot.model";
import Appointment from "../models/appointment.model";

export class ProfileService {

  // get the doctor profile
  static async getProfile() {
    return await Profile.findOne().select("-password");
  }

  // update doctor profile
  static async updateProfile(data: any) {

    const doctor = await Profile.findOne();

    if (!doctor) {
      throw new Error("Doctor not found.");
    }

    doctor.name = data.name ?? doctor.name;
    doctor.email = data.email ?? doctor.email;
    doctor.mobile = data.mobile ?? doctor.mobile;
    doctor.specialization =
      data.specialization ?? doctor.specialization;

    doctor.yearsofexperience =
      data.experience ?? doctor.yearsofexperience;


    return await doctor.save();
  }

  // upload odctor image

  static async upload(
    file: Express.Multer.File
  ) {

    if (!file) {
      const error: any =
        new Error(
          "Doctor image is required"
        );

      error.statusCode = 400;

      throw error;
    }

    const imageUrl =
      `/uploads/doctors/${file.filename}`;

    const profile =
      await Profile.findOneAndUpdate(
        {},

        {
          $set: {
            "image.url": imageUrl,
            "image.altText":
              "Doctor profile image",
          },
        },

        {
          new: true,
          runValidators: true,
        }
      );

    if (!profile) {
      const error: any =
        new Error(
          "Doctor profile not found"
        );

      error.statusCode = 404;

      throw error;
    }

    return profile;
  }

}