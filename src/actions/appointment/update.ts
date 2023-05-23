import { Request, Response } from "express";
import { updateAppointment, getAppointment } from "../../services/appointment";

export default async (request: Request, response: Response) => {
  const { id } = request.params;

  if (!(await getAppointment(id))) {
    return response.status(404).json({
      code: 404,
      message: "Appointment not found",
    });
  }

  const updatedAppointment = await updateAppointment(id, request.body);

  if ("error" in updatedAppointment) {
    return response.status(updatedAppointment.errorCode).json({
      code: updatedAppointment.errorCode,
      message: updatedAppointment.error,
    });
  } else {
    return response.json(updatedAppointment);
  }
};
