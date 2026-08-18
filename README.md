# Doctor Appointment Backend

Backend API for a Doctor Appointment Management System.

This backend provides APIs for managing doctors, appointment slots, patients, appointments, dashboard statistics, and appointment status updates.

---

## 🚀 Features

- Doctor profile management
- Appointment booking
- Appointment slot management
- Patient management
- Appointment pagination
- Appointment status management
- Unique appointment token generation
- Dashboard statistics
- Today's and upcoming appointments
- RESTful API architecture
- MongoDB database
- TypeScript support
- Express.js backend

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- REST API
- Axios
- CORS
- dotenv

---

## 📁 Project Structure

```text
doctor-appointment-backend/
│
├── src/
│   │
│   ├── controllers/
│   │   ├── appointment.controller.ts
│   │   ├── dashboard.controller.ts
│   │   ├── patient.controller.ts
│   │   ├── profile.controller.ts
│   │   └── slot.controller.ts
│   │
│   ├── models/
│   │   ├── appointment.model.ts
│   │   ├── patient.model.ts
│   │   ├── profile.model.ts
│   │   └── slot.model.ts
│   │
│   ├── routes/
│   │   ├── appointment.routes.ts
│   │   ├── dashboard.routes.ts
│   │   ├── patient.routes.ts
│   │   ├── profile.routes.ts
│   │   └── slot.routes.ts
│   │
│   ├── services/
│   │   ├── appointment.service.ts
│   │   ├── dashboard.service.ts
│   │   ├── patient.service.ts
│   │   ├── profile.service.ts
│   │   └── slot.service.ts
│   │
│   ├── config/
│   │   └── database.ts
│   │
│   └── server.ts
│
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
