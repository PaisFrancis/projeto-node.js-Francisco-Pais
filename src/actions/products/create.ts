import { Request, Response } from "express";
import { add } from "../../services/products";

export default async (request: Request, response: Response) => {
  const { name, price, description } = request.body;

  const newProduct = await add(name, price, description);

  return response.json(newProduct);
};
