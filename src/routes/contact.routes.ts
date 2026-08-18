import { Router } from "express";
import { ContactController } from "../controllers/contact.controller";

const router = Router();


router.post(
  "/",
  ContactController.createContact
);


router.get(
  "/",
  ContactController.getContacts
);

export default router;