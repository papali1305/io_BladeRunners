import { Schema, model } from "mongoose";

const slotSchema = new Schema(
	{
		status: {
			type: Boolean,
			default: false,
		},
		lotId: {
			type: Schema.Types.ObjectId,
			ref: "Lot",
			required: true,
		},
		userId: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
		preBookingTime: {
			type: Date,
		},
		details: {
			vNumber: {
				type: Number,
			},
			color: {
				type: String,
			},
			startTime: {
				type: Date,
				required: true,
				default: Date.now,
			},
			endTime: {
				type: Date,
				default: Date.now,
			},
		},
	},
	{ timestamps: true }
);

const Slot = model("Slot", slotSchema);

export default Slot;
