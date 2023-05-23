import express, { Request, Response } from "express";
import authRoutes from "./auth";
import patientRoutes from "./patient";
import doctorRoutes from "./doctor";
import appointmentRoutes from "./appointment";
import { name, version } from "../../package.json";

const router = express.Router();

router.get("/", (req: Request, res: Response) =>
  res.json({
    name,
    version,
  })
);

router.use("/auth", authRoutes);
router.use("/patient", patientRoutes);
router.use("/doctor", doctorRoutes);
router.use("/appointment", appointmentRoutes);

export default router;
