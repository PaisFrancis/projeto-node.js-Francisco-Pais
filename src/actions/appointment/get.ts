import { Request, Response } from "express";
import { getAppointment } from "../../services/appointment";

export default async (request: Request, response: Response) => {
  const { id } = request.params;

  const appointment = await getAppointment(id);

  if (!appointment) {
    return response.status(404).json({
      code: 404,
      message: "Product not found",
    });
  }

  return response.json(appointment);
};
