import { Request, Response } from "express";
import { getDoctor } from "../../services/doctor";

export default async (request: Request, response: Response) => {
  const { name } = request.query as { name: string };

  const doctor = await getDoctor(name);

  if (!doctor) {
    return response.status(404).json({
      code: 404,
      message: "Doctor not found",
    });
  }

  return response.json(doctor);
};
