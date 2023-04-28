import { PrismaClient, User } from "@prisma/client";

import bcrypt from "bcrypt";

export const prisma = new PrismaClient();

const login = async (email: string, password: string): Promise<User | null> => {
  const user = await prisma.user.findUnique({
    where: { email },
    include: { profile: true },
  });

  if (!user) return null;

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) return null;

  return user;
};

const allPatients = () =>
  prisma.patient.findMany({
    where: {
      deleted: false,
    },
  });

const detailPatient = (id: string) =>
  prisma.patient.findFirst({
    where: {
      id,
      deleted: false,
    },
  });

const addPatient = (
  name: string,
  age: number,
  sex: string,
  address: string,
  contact: string
) =>
  prisma.patient.create({
    data: {
      name,
      age,
      sex,
      address,
      contact,
    },
  });

const updatePatient = (id: string, patient: Patient) =>
  prisma.patient.update({
    where: { id },
    data: patient,
  });

const removePatient = (id: string) =>
  prisma.patient.update({
    where: { id },
    data: {
      deleted: true,
    },
  });

export {
  login,
  allPatients,
  detailPatient,
  addPatient,
  updatePatient,
  removePatient,
};
