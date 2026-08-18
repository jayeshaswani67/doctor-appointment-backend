import express from "express";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import authRoutes from "./routes/auth.routes";
import appointmentRoutes from "./routes/appointment.routes";
import contactRoutes from "./routes/contact.routes";
import dashboardRoutes from "./routes/dashboard.routes";
import patientRoutes from "./routes/patient.routes";
import slotRoutes from "./routes/slot.routes";
import settingsRoutes from "./routes/settings.routes";
import profileRoutes from "./routes/profile.routes";
import publicRoutes from "./routes/public.routes";

const app = express();


app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// console.log("PUBLIC ROUTES TYPE:", typeof publicRoutes, publicRoutes.name);

app.use(morgan("dev"));
app.use(
  "/uploads",
  express.static(
    path.join(
      process.cwd(),
      "uploads"
    )
  )
);


app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Doctor Appointment API Running",
  });
});


app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/appointment",
  appointmentRoutes
);

app.use(
  "/api/contact",
  contactRoutes
);

app.use(
  "/api/dashboard",
  dashboardRoutes
);

app.use(
  "/api/patient",
  patientRoutes
);

app.use(
  "/api/slot",
  slotRoutes
);

app.use(
  "/api/settings",
  settingsRoutes
);

app.use(
  "/api/profile",
  profileRoutes
);

app.use(
  "/api/public",
  publicRoutes
);


app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

export default app;