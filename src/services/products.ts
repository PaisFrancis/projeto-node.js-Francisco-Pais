import { PrismaClient, Product } from "@prisma/client";

export const prisma = new PrismaClient();

const all = () =>
  prisma.product.findMany({
    where: {
      deleted: false,
    },
  });

const detail = (id: string) =>
  prisma.product.findFirst({
    where: {
      id,
      deleted: false,
    },
  });

const add = (name: string, price: number, description: string) =>
  prisma.product.create({
    data: {
      name,
      price,
      description,
    },
  });

const update = (id: string, product: Product) =>
  prisma.product.update({
    where: { id },
    data: product,
  });

const remove = (id: string) =>
  prisma.product.update({
    where: { id },
    data: {
      deleted: true,
    },
  });

export { all, detail, add, update, remove };
