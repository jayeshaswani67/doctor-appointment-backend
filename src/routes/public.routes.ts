import { Router } from "express";

import {
  getLandingPage,
} from "../controllers/public.controller";

const router = Router();

router.get(
  "/landing",
  getLandingPage
);

export default router;