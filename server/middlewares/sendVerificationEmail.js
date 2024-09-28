import { resend } from "../utils/resend.js";
import VerificationEmail from "../utils/verificationEmail.js";
import dotenv from "dotenv";
dotenv.config();

export const sendVerificationEmail = async (email, name, verifyCode) => {
	try {
		await resend.emails.send({
			from: process.env.SEND_EMAIL_FROM || "",
			to: email,
			subject: "Verification Code for booking",
			react: `Hi ${name} verify with code: ${verifyCode} to confirm booking`,
		});
		return {
			success: true,
			message: "Verification email sent successfully.",
		};
	} catch (error) {
		console.error("Error sending verification email: ", error);
		return {
			success: false,
			message: "Failed to send verification email.",
		};
	}
};
