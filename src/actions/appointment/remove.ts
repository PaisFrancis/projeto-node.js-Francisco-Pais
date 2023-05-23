import { Request, Response } from "express";
import { deleteAppointment, getAppointment } from "../../services/appointment";

export default async (request: Request, response: Response) => {
  const { id } = request.params;

  if (!(await getAppointment(id))) {
    return response.status(404).json({
      code: 404,
      message: "Appointment not found",
    });
  }

  const deletedAppointment = await deleteAppointment(id);
  return response.json(deletedAppointment);
};
