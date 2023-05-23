import { PrismaClient, Patient } from "@prisma/client";

export const prisma = new PrismaClient();

const getAllPatients = () =>
  prisma.patient.findMany({
    // Find all, even deleted records
  });

const getPatient = (name?: string, id?: string) => {
  return prisma.patient.findFirst({
    where: {
      name,
      id,
      deleted: false,
    },
  });
};

const createPatient = (
  name: string,
  age: number,
  sex: string,
  address: string,
  contact: string
) => {
  return prisma.patient.create({
    data: {
      name,
      age,
      sex,
      address,
      contact,
    },
  });
};

const updatePatient = (id: string, patient: Patient) => {
  return prisma.patient.update({
    where: { id },
    data: patient,
  });
};

const deletePatient = (id: string) => {
  return prisma.patient.update({
    where: { id },
    data: {
      deleted: true,
    },
    select: {
      id: true,
      name: true,
      age: true,
      sex: true,
      address: true,
      contact: true,
      createdAt: true,
      updatedAt: true,
      deleted: true,
    },
  });
};

export {
  getAllPatients,
  getPatient,
  createPatient,
  updatePatient,
  deletePatient,
};
