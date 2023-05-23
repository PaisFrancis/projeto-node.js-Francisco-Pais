import express from "express";
import { get, getAll, create, remove, update } from "../actions/appointment";

const router = express.Router();

router.get("", getAll);
router.get("/:id", get);
router.post("", create);
router.delete("/:id", remove);
router.put("/:id", update);

export default router;
