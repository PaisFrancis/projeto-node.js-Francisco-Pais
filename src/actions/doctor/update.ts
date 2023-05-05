import { Request, Response } from "express";
import { updateDoctor, getDoctor } from "../../services/doctor";

export default async (request: Request, response: Response) => {
  const { id } = request.params;

  if (!(await getDoctor(id))) {
    return response.status(404).json({
      code: 404,
      message: "Doctor not found",
    });
  }

  const product = await updateDoctor(id, request.body);

  return response.json(product);
};
