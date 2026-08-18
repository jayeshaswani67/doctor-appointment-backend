import multer from "multer";
import path from "path";
import fs from "fs";

// upload

const uploadPath = path.join(
  process.cwd(),
  "uploads",
  "doctors"
);


if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, {
    recursive: true,
  });
}

// storage

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadPath);
  },

  filename: (_req, file, cb) => {
    const extension = path.extname(
      file.originalname
    );

    const filename =
      `doctor-${Date.now()}${extension}`;

    cb(null, filename);
  },
});

// file filter

const fileFilter: multer.Options["fileFilter"] =
  (_req, file, cb) => {

    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
    ];

    if (
      allowedTypes.includes(
        file.mimetype
      )
    ) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Only JPG, JPEG, PNG and WEBP images are allowed."
        )
      );
    }
  };
// upload

export const uploadDoctorImage =
  multer({
    storage,

    fileFilter,

    limits: {
      fileSize:
        5 * 1024 * 1024,
    },
  });

export default uploadDoctorImage;