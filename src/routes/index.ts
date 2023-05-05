import express, { Request, Response } from "express";
import authRoutes from "./doctor";
import productRoutes from "./patient";
import orderRoutes from "./appointment";
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
router.use("/order", orderRoutes);

export default router;
