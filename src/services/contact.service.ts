import Contact from "../models/contact.model";

export class ContactService {

// landing page
  static async createContact(data: {
    fullName: string;
    email: string;
    mobileNumber: string;
    subject: string;
    message: string;
  }) {
    return await Contact.create(data);
  }

//  getting contact all
  static async getContacts(page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const contacts = await Contact.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Contact.countDocuments();

    return {
      contacts,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }


}