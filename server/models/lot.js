import { Schema, model } from "mongoose";

const lotSchema = new Schema(
	{
		lotName: {
			type: String,
			required: true,
		},
		lotAddress: {
			type: Schema.Types.ObjectId,
      ref: "LotAddress",
			required: true,
		},
		capacity: {
			type: Number,
			required: true,
		},
		availableSpaces: {
			type: Number,
			required: true,
		},
		hourlyRate: {
			type: Number,
			required: true,
		},
		location: {
			type: {
				type: String,
				enum: ["Point"],
			},
			coordinates: [Number],
		},
	},
	{ timestamps: true }
);

const Lot = model("Lot", lotSchema);

export default Lot;
