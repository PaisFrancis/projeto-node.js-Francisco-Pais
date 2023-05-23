import { Request, Response } from "express";
import { deletePatient, getPatient } from "../../services/patient";

export default async (request: Request, response: Response) => {
  const { id } = request.params;

  if (!(await getPatient(undefined, id))) {
    return response.status(404).json({
      code: 404,
      message: "Patient not found",
    });
  }

  const deletedPatient = await deletePatient(id);
  return response.json(deletedPatient);
};
