import { Request, Response } from "express";
import { updatePatient, getPatient } from "../../services/patient";

export default async (request: Request, response: Response) => {
  const { id } = request.params;

  if (!(await getPatient(undefined, id))) {
    return response.status(404).json({
      code: 404,
      message: "Patient not found",
    });
  }

  const patient = await updatePatient(id, request.body);

  return response.json(patient);
};
