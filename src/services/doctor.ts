import { PrismaClient, Doctor } from "@prisma/client";

export const prisma = new PrismaClient();

const getAllDoctors = () =>
  prisma.doctor.findMany({
    // Find all, even deleted records
  });

const getDoctor = (name?: string, id?: string) => {
  return prisma.doctor.findFirst({
    where: {
      name,
      id,
      deleted: false,
    },
  });
};

const createDoctor = (
  name: string,
  field: string,
  address: string,
  contact: string
) => {
  return prisma.doctor.create({
    data: {
      name,
      field,
      address,
      contact,
    },
  });
};

const updateDoctor = (id: string, doctor: Doctor) => {
  return prisma.doctor.update({
    where: { id },
    data: doctor,
  });
};

const deleteDoctor = (id: string) => {
  return prisma.doctor.update({
    where: { id },
    data: {
      deleted: true,
    },
    select: {
      id: true,
      name: true,
      field: true,
      address: true,
      contact: true,
      createdAt: true,
      updatedAt: true,
      deleted: true,
    },
  });
};

export { getAllDoctors, getDoctor, createDoctor, updateDoctor, deleteDoctor };

//todo: look into the connect issue(appointments)  pack everything in and index.ts file, then make that code DRY. Start looking into actions, only after that, auth and lastly middleware
