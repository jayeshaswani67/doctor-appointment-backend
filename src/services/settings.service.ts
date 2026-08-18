import Doctor from "../models/profile.model";
import Slot from "../models/slot.model";

// setting data
interface SettingsData {
  // Doctor information
  name?: string;
  title?: string;
  qualification?: string;
  specialization?: string;
  experience?: number;
  bio?: string;

  // Doctor image
  image?: {
    url?: string;
    altText?: string;
  };

  // Clinic
  clinic?: string;
  address?: string;

  // Consultation
  consultationFees?: {
    amount: number;
    currency?: string;
  };

  // Contact
  contactInfo?: {
    phone?: string;
    email?: string;
    clinicAddress?: string;

    socialLinks?: {
      facebook?: string;
      twitter?: string;
      linkedin?: string;
      instagram?: string;
    };
  };

  // Working hours
  workingHours?: {
    day: string;
    enabled: boolean;

    morningStart?: string;
    morningEnd?: string;

    eveningStart?: string;
    eveningEnd?: string;
  }[];

  // Slot configuration
  slotDuration?: number;
}

// service

export class SettingsService {
  static async saveSettings(data: SettingsData) {
    const doctor = await Doctor.findOne();

    if (!doctor) {
      const error: any = new Error("Doctor profile not found.");

      error.statusCode = 404;

      throw error;
    }

    // information

    if (data.name !== undefined) {
      doctor.name = data.name;
    }

    if (data.title !== undefined) {
      doctor.title = data.title;
    }

    if (data.qualification !== undefined) {
      doctor.qualification = data.qualification;
    }

    if (data.specialization !== undefined) {
      doctor.specialization = data.specialization;
    }

    if (data.experience !== undefined) {
      doctor.yearsofexperience = data.experience;
    }

    if (data.bio !== undefined) {
      doctor.bio = data.bio;
    }

    //  image

    if (data.image !== undefined) {
      doctor.image = {
        url: data.image.url ?? doctor.image?.url ?? "",

        altText: data.image.altText ?? doctor.image?.altText ?? "",
      };
    }

    if (data.clinic !== undefined) {
      doctor.clinic = data.clinic;
    }

    if (data.address !== undefined) {
      doctor.address = data.address;
    }

    if (data.consultationFees !== undefined) {
      doctor.consultationFees = {
        amount: data.consultationFees.amount,

        currency:
          data.consultationFees.currency ??
          doctor.consultationFees?.currency ??
          "INR",
      };
    }

    if (data.contactInfo !== undefined) {
      const existingContact = doctor.contactInfo || {};

      const existingSocialLinks = existingContact.socialLinks || {};

      const newContact = data.contactInfo;

      doctor.contactInfo = {
        phone: newContact.phone ?? existingContact.phone ?? "",

        email: newContact.email ?? existingContact.email ?? "",
      

        clinicAddress:
          newContact.clinicAddress ?? existingContact.clinicAddress ?? "",

        socialLinks: {
          facebook:
            newContact.socialLinks?.facebook ??
            existingSocialLinks.facebook ??
            "",

          twitter:
            newContact.socialLinks?.twitter ??
            existingSocialLinks.twitter ??
            "",

          linkedin:
            newContact.socialLinks?.linkedin ??
            existingSocialLinks.linkedin ??
            "",

          instagram:
            newContact.socialLinks?.instagram ??
            existingSocialLinks.instagram ??
            "",
        },
      };
    }

    if (data.workingHours !== undefined) {
      doctor.workingHours = data.workingHours;
    }

    if (data.slotDuration !== undefined) {
      doctor.slotDuration = data.slotDuration;
    }

    // save

    await doctor.save();

    return doctor.toObject();
  }

  static async getSettings() {
    const doctor = await Doctor.findOne().lean();

    if (!doctor) {
      const error: any = new Error("Doctor profile not found.");

      error.statusCode = 404;

      throw error;
    }

    return {
      doctor: {
        id: doctor._id,

        name: doctor.name || "",

        title: doctor.title || "",

        qualification: doctor.qualification || "",

        specialization: doctor.specialization || "",

        experience: doctor.yearsofexperience || 0,

        bio: doctor.bio || "",

        image: doctor.image || {
          url: "",
          altText: "",
        },
      },

      clinic: {
        name: doctor.clinic || "",

        address: doctor.address || "",
      },

      consultationFees: doctor.consultationFees || {
        amount: 0,
        currency: "INR",
      },

      contactInfo: doctor.contactInfo || {},

      call: {
        phone: doctor.contactInfo?.phone || "",

        tel: doctor.contactInfo?.phone || "",
      },

      workingHours: doctor.workingHours || [],

      slotDuration: doctor.slotDuration || 30,
    };
  }

  // get slots

  static async getSlots() {
    const slots = await Slot.find({})
      .sort({
        date: 1,
        startTime: 1,
      })
      .lean();

    return slots;
  }
}
