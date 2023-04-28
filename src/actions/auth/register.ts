import { Request, Response } from "express";
import { register } from "../../services/auth";

export default async (request: Request, response: Response) => {
  try {
    const { email, password, firstName, lastName, bio } = request.body;

    const user = await register(email, password, firstName, lastName, bio);

    return response.json({ user });
  } catch (e: any) {
    return response.status(400).json({
      code: 400,
      error: "Bad Request",
      message: e.message,
    });
  }
};
