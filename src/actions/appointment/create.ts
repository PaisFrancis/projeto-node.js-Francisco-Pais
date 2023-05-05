import { Request, Response } from "express";
import { createAppointment } from "../../services/appointment";

export default async (req: Request, res: Response) => {
  const { date, time, room, patientId, doctorId, observations } = req.body;

  const newAppointment = await createAppointment(
    date,
    time,
    room,
    patientId,
    doctorId,
    observations
  );
};
