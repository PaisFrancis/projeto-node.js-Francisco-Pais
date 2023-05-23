import { Request, Response } from "express";

export default async (request: Request, response: Response) => {
  return response.json(request.user);
};
