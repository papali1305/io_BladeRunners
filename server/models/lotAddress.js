import { Schema, model } from "mongoose";

const lotAddressSchema = new Schema(
	{
		street: {
			type: String,
			required: true,
		},
		city: {
			type: String,
			required: true,
		},
		state: {
			type: String,
			required: true,
		},
		zip: {
			type: String,
			required: true,
		},
		country: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

const LotAddress = model("LotAddress", lotAddressSchema);
export default LotAddress;
