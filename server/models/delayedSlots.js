import { Schema, model } from "mongoose";

const DelaySlotSchema = new Schema(
	{
		slotId: {
			type: Schema.Types.ObjectId,
			ref: "Slot",
			required: true,
		},
		userId: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		startTime: {
			type: Date,
			required: true,
		},
	},
	{ timestamps: true }
);

const DelaySlot = model("DelaySlot", DelaySlotSchema);

export default DelaySlot;
