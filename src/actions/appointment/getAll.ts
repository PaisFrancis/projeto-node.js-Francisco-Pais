import { Request, Response } from "express";
import { getAllAppointments } from "../../services/appointment";

export default async (_: Request, res: Response) => {
  res.json(await getAllAppointments());
};
