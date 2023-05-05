import { Appointment, Doctor, Patient } from "@prisma/client";

const prisma = require("./patient");

const getAllAppointments = () =>
  prisma.appointment.findMany({
    where: {
      deleted: false,
    },
  });

const getAppointment = (id: string) => {
  return prisma.appointment.findFirst({
    where: {
      id,
      deleted: false,
    },
  });
};

const createAppointment = (
  date: string,
  time: string,
  room: string,
  { id: patientId }: Patient,
  { id: doctorId }: Doctor,
  observations?: string
) => {
  return prisma.appointment.create({
    data: {
      date,
      time,
      room,
      patientId,
      doctorId,
      observations,
    },
  });
};

const updateAppointment = (id: string, data: Partial<Appointment>) => {
  return prisma.appointment.update({ where: { id }, data });
};

const deleteAppointment = (id: string) => {
  return prisma.appointment.update({
    where: { id },
    data: {
      deleted: true,
    },
  });
};

export {
  getAllAppointments,
  getAppointment,
  createAppointment,
  updateAppointment,
  deleteAppointment,
};
