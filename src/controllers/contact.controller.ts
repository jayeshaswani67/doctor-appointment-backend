import {
  Request,
  Response,
  NextFunction,
} from "express";

import { ContactService } from "../services/contact.service";

export class ContactController {
  // POST Contact
  static async createContact(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const {
        fullName,
        email,
        mobileNumber,
        subject,
        message,
      } = req.body;

      if (
        !fullName ||
        !email ||
        !mobileNumber ||
        !subject ||
        !message
      ) {
        return res.status(400).json({
          success: false,
          message: "All fields are required.",
        });
      }

      const contact =
        await ContactService.createContact({
          fullName,
          email,
          mobileNumber,
          subject,
          message,
        });

      return res.status(201).json({
        success: true,
        message:
          "Your message has been sent successfully.",
        data: contact,
      });
    } catch (error) {
      next(error);
    }
  }

  // GET Contacts
   static async getContacts(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 11;

      const data = await ContactService.getContacts(
        page,
        limit
      );

      return res.status(200).json({
        success: true,
        message: "Contacts fetched successfully",
        data,
      });
    } catch (error) {
      next(error);
    }
  }
}