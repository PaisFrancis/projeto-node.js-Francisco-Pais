import { Request, Response } from "express";
import { getAllDoctors } from "../../services/doctor";

export default async (_: Request, response: Response) => {
  response.json(await getAllDoctors());
};
