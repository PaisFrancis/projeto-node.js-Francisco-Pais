import express from "express";
import {
  getAllPatients,
  getPatient /*... other functions */,
} from "../services/patient";

const router = express.Router();

router.get("/patients", getAllPatients);
router.get("/patients/:id", getPatient);

export default router;
