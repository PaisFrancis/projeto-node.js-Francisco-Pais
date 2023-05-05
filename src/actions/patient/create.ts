import { Request, Response } from "express";
import { createPatient } from "../../services/patient";

export default async (request: Request, response: Response) => {
  const { name, age, sex, address, contact } = request.body;

  const newPatient = await createPatient(name, age, sex, address, contact);

  return response.json(newPatient);
};
