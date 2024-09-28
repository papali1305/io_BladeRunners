import { Router } from "express";
import { contactUs, register } from "../controllers/userController.js";
import { verifyCode } from "../controllers/verifyCodeController.js";

const router = Router();

router.route("/register").post(register);
router.route("/verify-code").post(verifyCode);
router.route("/contact-us").post(contactUs);

export default router;
