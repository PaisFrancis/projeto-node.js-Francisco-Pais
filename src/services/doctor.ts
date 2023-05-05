import { Doctor } from "@prisma/client";

const prisma = require("./patient");

const getAllDoctors = () =>
  prisma.doctor.findMany({
    where: {
      deleted: false,
    },
  });

const getDoctor = (name: string) => {
  return prisma.doctor.findFirst({
    where: {
      name,
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

const updateDoctor = (id: string, data: Doctor) => {
  return prisma.doctor.update({ where: { id }, data });
};

const deleteDoctor = (id: string) => {
  return prisma.doctor.update({
    where: { id },
    data: {
      deleted: true,
    },
  });
};

export { getAllDoctors, getDoctor, createDoctor, updateDoctor, deleteDoctor };

//todo: look into the connect issue(appointments)  pack everything in and index.ts file, then make that code DRY. Start looking into actions, only after that, auth and lastly middleware
