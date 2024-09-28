import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		phoneNumber: {
			type: String,
			required: true,
			unique: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		verifyCode: {
			type: String,
		},
		isVerified: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

const User = model("User", userSchema);

export default User;
