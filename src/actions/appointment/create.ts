import { Request, Response } from "express";
import { createAppointment } from "../../services/appointment";

export default async (request: Request, response: Response) => {
  const { date, room, patientId, doctorId, observations } = request.body;

  const newAppointment = await createAppointment(
    date,

    room,
    patientId,
    doctorId,
    observations
  );

  return response.json(newAppointment);
};
