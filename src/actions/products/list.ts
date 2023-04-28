import { Request, Response } from "express";
import { all } from "../../services/patient";

export default async (_: Request, response: Response) => {
  response.json(await all());
};
