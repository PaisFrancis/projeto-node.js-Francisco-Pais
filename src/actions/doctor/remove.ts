import { Request, Response } from "express";
import { deleteDoctor, getDoctor } from "../../services/doctor";

export default async (request: Request, response: Response) => {
  const { id } = request.params;

  if (!(await getDoctor(id))) {
    return response.status(404).json({
      code: 404,
      message: "Doctor not found",
    });
  }

  await deleteDoctor(id);
  return response.json();
};
