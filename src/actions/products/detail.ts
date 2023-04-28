import { Request, Response } from "express";
import { detail } from "../../services/products";

export default async (request: Request, response: Response) => {
  const { id } = request.params;

  const product = await detail(id);

  if (!product) {
    return response.status(404).json({
      code: 404,
      message: "Product not found",
    });
  }

  return response.json(product);
};
