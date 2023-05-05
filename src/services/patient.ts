import { PrismaClient, Patient } from "@prisma/client";

export const prisma = new PrismaClient();

const getAllPatients = () =>
  prisma.patient.findMany({
    where: {
      deleted: false,
    },
  });

const getPatient = (name: string) => {
  return prisma.patient.findFirst({
    where: {
      name,
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

const updatePatient = (id: string, data: Patient) => {
  return prisma.patient.update({ where: { id }, data });
};

const deletePatient = (id: string) => {
  return prisma.patient.update({
    where: { id },
    data: {
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
