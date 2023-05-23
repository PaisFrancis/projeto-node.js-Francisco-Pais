import { Appointment } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

const getAllAppointments = () =>
  prisma.appointment.findMany({
    where: {
      deleted: false,
    },
    include: {
      patient: true,
      doctor: true,
    },
  });

const getAppointment = (id: string) => {
  return prisma.appointment.findFirst({
    where: {
      id,
      deleted: false,
    },
    include: {
      patient: true,
      doctor: true,
    },
  });
};

const createAppointment = async (
  date: Date,
  room: string,
  patientId: string,
  doctorId: string,
  observations: string
) => {
  // Check if the doctor exists
  const doctor = await prisma.doctor.findFirst({ where: { id: doctorId } });
  if (!doctor) {
    throw new Error("Doctor not found");
  }

  // Check if the patient exists
  const patient = await prisma.patient.findFirst({ where: { id: patientId } });
  if (!patient) {
    throw new Error("Patient not found");
  }

  return prisma.appointment.create({
    data: {
      date,
      room,
      observations,
      doctor: {
        connect: {
          id: doctorId,
        },
      },
      patient: {
        connect: {
          id: patientId,
        },
      },
    },
    include: {
      patient: true,
      doctor: true,
    },
  });
};

const updateAppointment = async (id: string, appointment: Appointment) => {
  // Check if the appointment exists
  const existingAppointment = await prisma.appointment.findUnique({
    where: { id },
  });
  if (!existingAppointment) {
    throw new Error("Appointment not found");
  }

  // Create a new object without the patientId field
  const { patientId, ...appointmentData } = appointment || {};

  if (appointment.patientId) {
    return {
      error:
        "Cannot update patientId, if this was intentional, create a new appointment instead",
      errorCode: 400,
    };
  }

  // Update the appointment fields
  const updatedAppointment = await prisma.appointment.update({
    where: { id },
    data: appointmentData,
    include: { patient: true, doctor: true },
  });

  // Return the updated appointment
  return updatedAppointment;
};

const deleteAppointment = (id: string) => {
  return prisma.appointment.delete({
    where: { id },
    select: {
      id: true,
      date: true,
      room: true,
      observations: true,
      createdAt: true,
      updatedAt: true,
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
