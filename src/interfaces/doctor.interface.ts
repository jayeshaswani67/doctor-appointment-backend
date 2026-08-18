export interface IDoctor {
  id: string;

  fullName: string;

  specialization: string;

  qualification: string;

  experience: number;

  clinicName: string;

  clinicAddress: string;

  phone: string;

  email: string;

  consultationFee: number;

  availableDays: string[];

  morningSlots: string[];

  eveningSlots: string[];

  profileImage?: string;

  about?: string;

  isAvailable: boolean;
}