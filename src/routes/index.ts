import express, { Request, Response } from "express";
import authRoutes from "./auth";
import productRoutes from "./products";
import { name, version } from "../../package.json";

const router = express.Router();

router.get("/", (req: Request, res: Response) =>
  res.json({
    name,
    version,
  })
);

router.use("/auth", authRoutes);
router.use("/products", productRoutes);

export default router;
