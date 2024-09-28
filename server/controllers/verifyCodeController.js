import User from "../models/user.js";
import { isBookingVerified } from "./slotController.js";

export const verifyCode = async (req, res) => {
	try {
		const { email, code } = req.body;
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({
				message: "Invalid code",
				success: false,
			});
		}
		if (!(user.verifyCode === code)) {
			return isBookingVerified(req, res);
		}

		console.log("USer", user.verifyCode);
		console.log("Code", code);

		user.isVerified = true;
		await user.save();
		return res.status(200).json({
			message: "Verified",
			success: true,
		});
	} catch (error) {
		console.log(error);
	}
};
