import { Router } from "express";
import { register } from "../controllers/userController.js";
import { verifyCode } from "../controllers/verifyCodeController.js";

const router = Router();

router.route("/register").post(register);
router.route("/verify-code").post(verifyCode);

export default router;
