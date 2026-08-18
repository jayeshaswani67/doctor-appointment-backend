import Patient from "../models/patient.model";

export class PatientService {
  static async getPatients(
    page = 1,
    limit = 10
  ) {
    
    // VALIDATE PAGINATION
    

    page = Math.max(1, Number(page) || 1);

    limit = Math.min(
      100,
      Math.max(1, Number(limit) || 10)
    );

    const skip = (page - 1) * limit;

    
    // GET PATIENTS + TOTAL COUNT
    

    const [patients, total] =
      await Promise.all([
        Patient.find()
          .sort({
            createdAt: -1,
          })
          .skip(skip)
          .limit(limit)
          .lean(),

        Patient.countDocuments(),
      ]);

    
    // RESPONSE
    

    return {
      data: patients,

      pagination: {
        page,

        limit,

        total,

        totalPages:
          Math.ceil(total / limit),

        hasNextPage:
          page <
          Math.ceil(total / limit),

        hasPreviousPage:
          page > 1,
      },
    };
  }
}