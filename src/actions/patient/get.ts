import { Request, Response } from "express";
import { getPatient } from "../../services/patient";

export default async (request: Request, response: Response) => {
  const { name } = request.query as { name: string };

  const patient = await getPatient(name);

  if (!patient) {
    return response.status(404).json({
      code: 404,
      message: "Patient not found",
    });
  }

  return response.json(patient);
};
