import { Router } from "express";
import {
	getEmptySlot,
	addSlot,
	bookSlot,
	getAllSlotsById,
  parkOut,
} from "../controllers/slotController.js";

const router = Router();

router.route("/add-slot").post(addSlot);
router.route("/book-slot").post(bookSlot);
router.route("/park-out").post(parkOut);
router.route("/:lotId").get(getAllSlotsById);
router.route("/empty-slot/:lotId").get(getEmptySlot);

export default router;
