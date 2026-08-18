import { Request, Response } from "express";
import { PatientService } from "../services/patient.service";

export const getPatients = async (
  req: Request,
  res: Response
) => {
  try {
    
    // PAGINATION
    

    const page = Math.max(
      1,
      Number(req.query.page) || 1
    );

    const limit = Math.min(
      100,
      Math.max(
        1,
        Number(req.query.limit) || 10
      )
    );

    
    // GET PATIENTS
    

    const result =
      await PatientService.getPatients(
        page,
        limit
      );

    
    // RESPONSE
    

    return res.status(200).json({
      success: true,

      data: result.data,

      pagination: result.pagination,
    });

  } catch (error: any) {
    console.error(
      "Get patients error:",
      error
    );

    return res.status(500).json({
      success: false,

      message:
        error?.message ||
        "Failed to fetch patients",
    });
  }
};