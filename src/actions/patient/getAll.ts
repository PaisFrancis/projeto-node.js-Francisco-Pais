import { Request, Response } from "express";
import { getAllPatients } from "../../services/patient";

export default async (_: Request, response: Response) => {
  response.json(await getAllPatients());
};
