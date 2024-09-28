import { Router } from "express";
import { getAllLots, registerLot } from "../controllers/lotController.js";

const router = Router();

router.route("/register").post(registerLot);
router.route("/").get(getAllLots);

export default router;
