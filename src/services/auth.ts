import { PrismaClient, User } from "@prisma/client";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";

const prisma = new PrismaClient();

export async function register(
  login: string,
  password: string,
  firstName: string,
  lastName?: string,
  bio?: string
) {
  const user = await prisma.user.create({
    data: {
      login,
      password: await bcrypt.hash(password, 8),
      profile: {
        create: {
          firstName,
          lastName,
          bio,
        },
      },
    },
  });

  return createToken(user);
}

export const findById = async (id: string) =>
  prisma.user.findUnique({
    where: { id },
    include: { profile: true },
  });

export async function attemptLogin(login: string, password: string) {
  const user = await prisma.user.findFirst({
    where: {
      login,
      deleted: false,
    },
  });

  const match = user && (await bcrypt.compare(password, user.password));

  if (!user || !match) {
    throw new Error("Bad credentials");
  }

  return createToken(user);
}

function createToken(user: User): string {
  const token = sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 180,
      email: user.login,
      user_id: user.id,
    },
    process.env.JWT_SECRET!
  );

  return token;
}
