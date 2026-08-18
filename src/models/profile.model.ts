import mongoose, { Document, Schema } from "mongoose";

/* 
   WORKING HOURS
 */

export interface IWorkingHour {
  day: string;
  enabled: boolean;

  morningStart?: string;
  morningEnd?: string;

  eveningStart?: string;
  eveningEnd?: string;
}

/* 
   SOCIAL LINKS
 */

export interface ISocialLinks {
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  instagram?: string;
}

/* 
   CONTACT INFORMATION
 */

export interface IContactInfo {
  mobileNumber: string | undefined;
  mobile: string | undefined;
  phone?: string;
  email?: string;
  clinicAddress?: string;

  socialLinks?: ISocialLinks;
}

/* 
   CONSULTATION FEES
 */

export interface IConsultationFees {
  amount: number;
  currency: string;
}

/* 
   DOCTOR
 */

export interface IDoctor extends Document {
  /* Basic Information */

  name: string;

  email: string;

  password: string;

  mobile: string;

  /* Professional Information */

  title: string;

  qualification: string;

  specialization: string;

  yearsofexperience: number;

  image: {
    url: string;
    altText: string;
  };

  /* About Doctor */

  bio: string;

  /* Clinic Information */

  clinic: string;

  address: string;

  /* Contact */

  contactInfo: IContactInfo;

  /* Consultation */

  consultationFees: IConsultationFees;

  /* Working Hours */

  workingHours: IWorkingHour[];

  /* Old / Existing Field */

  workingTime: string;

  /* Slot Configuration */

  slotDuration: number;

  /* Password Reset */

  resetToken?: string | null;

  resetTokenExpiry?: Date | null;

  /* Timestamps */

  createdAt: Date;

  updatedAt: Date;
}

/* 
   WORKING HOURS SCHEMA
 */

const workingHourSchema = new Schema<IWorkingHour>(
  {
    day: {
      type: String,
      required: true,
    },

    enabled: {
      type: Boolean,
      default: true,
    },

    morningStart: {
      type: String,
      default: "",
    },

    morningEnd: {
      type: String,
      default: "",
    },

    eveningStart: {
      type: String,
      default: "",
    },

    eveningEnd: {
      type: String,
      default: "",
    },
  },
  {
    _id: false,
  },
);

/* 
   SOCIAL LINKS SCHEMA
 */

const socialLinksSchema = new Schema<ISocialLinks>(
  {
    facebook: {
      type: String,
      default: "",
    },

    twitter: {
      type: String,
      default: "",
    },

    linkedin: {
      type: String,
      default: "",
    },

    instagram: {
      type: String,
      default: "",
    },
  },
  {
    _id: false,
  },
);

/* 
   CONTACT INFO SCHEMA
 */

const contactInfoSchema = new Schema<IContactInfo>(
  {
    phone: {
      type: String,
      default: "",
    },

    email: {
      type: String,
      default: "",
    },

    clinicAddress: {
      type: String,
      default: "",
    },

    socialLinks: {
      type: socialLinksSchema,
      default: {},
    },
  },
  {
    _id: false,
  },
);

/* 
   CONSULTATION FEES SCHEMA
 */

const consultationFeesSchema = new Schema<IConsultationFees>(
  {
    amount: {
      type: Number,
      default: 0,
    },

    currency: {
      type: String,
      default: "INR",
    },
  },
  {
    _id: false,
  },
);

/* 
   DOCTOR SCHEMA
 */

const doctorSchema = new Schema<IDoctor>(
  {
    /* 
         BASIC INFORMATION
       */

    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    mobile: {
      type: String,
      required: true,
      trim: true,
    },

    /* 
         PROFESSIONAL INFORMATION
       */

    title: {
      type: String,
      default: "",
      trim: true,
    },

    qualification: {
      type: String,
      default: "",
      trim: true,
    },

    specialization: {
      type: String,
      default: "",
      trim: true,
    },

    yearsofexperience: {
      type: Number,
      default: 0,
    },

    /* 
         ABOUT
       */

    bio: {
      type: String,
      default: "",
      trim: true,
    },

    /* 
         CLINIC
       */

    clinic: {
      type: String,
      default: "",
      trim: true,
    },

    address: {
      type: String,
      default: "",
      trim: true,
    },

    /* 
         CONTACT
       */

    contactInfo: {
      type: contactInfoSchema,
      default: {},
    },

    /* 
         CONSULTATION
       */

    consultationFees: {
      type: consultationFeesSchema,

      default: {
        amount: 0,
        currency: "INR",
      },
    },
    

    /* 
         WORKING HOURS
       */

    workingHours: {
      type: [workingHourSchema],

      default: [
        {
          day: "Monday",
          enabled: true,
          morningStart: "09:00",
          morningEnd: "13:00",
          eveningStart: "17:00",
          eveningEnd: "20:00",
        },
        {
          day: "Tuesday",
          enabled: true,
          morningStart: "09:00",
          morningEnd: "13:00",
          eveningStart: "17:00",
          eveningEnd: "20:00",
        },
        {
          day: "Wednesday",
          enabled: true,
          morningStart: "09:00",
          morningEnd: "13:00",
          eveningStart: "17:00",
          eveningEnd: "20:00",
        },
        {
          day: "Thursday",
          enabled: true,
          morningStart: "09:00",
          morningEnd: "13:00",
          eveningStart: "17:00",
          eveningEnd: "20:00",
        },
        {
          day: "Friday",
          enabled: true,
          morningStart: "09:00",
          morningEnd: "13:00",
          eveningStart: "17:00",
          eveningEnd: "20:00",
        },
        {
          day: "Saturday",
          enabled: true,
          morningStart: "09:00",
          morningEnd: "13:00",
          eveningStart: "",
          eveningEnd: "",
        },
        {
          day: "Sunday",
          enabled: false,
          morningStart: "",
          morningEnd: "",
          eveningStart: "",
          eveningEnd: "",
        },
      ],
    },

    /* 
         EXISTING WORKING TIME
       */

    workingTime: {
      type: String,
      default: "",
      trim: true,
    },

    /* 
         SLOT DURATION
       */

    slotDuration: {
      type: Number,
      default: 30,
    },

    /* 
         FORGOT PASSWORD
       */

    resetToken: {
      type: String,
      default: null,
    },

    resetTokenExpiry: {
      type: Date,
      default: null,
    },
  },

  {
    timestamps: true,
  },
);

/* 
   MODEL
 */

const Doctor = mongoose.model<IDoctor>("Doctor", doctorSchema);

export default Doctor;
