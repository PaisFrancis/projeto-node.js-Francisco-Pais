import { Request, Response } from "express";
import { createDoctor } from "../../services/doctor";

export default async (request: Request, response: Response) => {
  const { name, field, address, contact } = request.body;

  const newDoctor = await createDoctor(name, field, address, contact);

  return response.json(newDoctor);
};
