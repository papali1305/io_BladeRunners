import { sendVerificationEmail } from "../middlewares/sendVerificationEmail.js";
import Lot from "../models/lot.js";
import Slot from "../models/slot.js";
import User from "../models/user.js";

export const getAllSlotsById = async (req, res) => {
	try {
		const lotId = req.params.lotId;
		const slots = await Slot.find({ lotId });
		if (!slots)
			return res.status(404).json({
				message: "No slots found",
				success: false,
			});

		return res.status(200).json({
			message: "Slots found",
			success: true,
			slots,
		});
	} catch (error) {
		console.log(error);
	}
};

export const addSlot = async (req, res) => {
	try {
		const lotName = req.body.lotName;
		const lot = await Lot.findOne({ lotName });
		if (!lot) {
			return res.status(404).json({
				message: "No lot found",
				success: false,
			});
		}

		const slot = await Slot.create({
			lotId: lot._id,
		});

		if (!slot) {
			return res.status(400).json({
				message: "Error creating slot",
				success: false,
			});
		}

		return res.status(201).json({
			message: "Slot created",
			success: true,
			slot,
		});
	} catch (error) {
		console.log(error);
	}
};

export const getEmptySlot = async (req, res) => {
	try {
		const lotId = req.params.lotId;
		const slots = await Slot.find({ lotId, status: false });
		if (!slots) {
			return res.status(404).json({
				message: "No empty slot found",
				success: false,
			});
		}

		return res.status(200).json({
			message: "Slots retrieved successfully",
			success: true,
			slots,
		});
	} catch (error) {
		console.log(error);
	}
};

export const bookSlot = async (req, res) => {
	try {
		const { lotName, email, vNumber, color } = req.body;
		if (!lotName || !email || !vNumber || !color)
			return res.status(400).json({
				message: "Something is missing",
				success: false,
			});

		const user = await User.findOne({ email });
		if (!user)
			return res.status(404).json({
				message: "Please register to book",
				success: false,
			});

		const lot = await Lot.findOne({ lotName });
		if (!lot) {
			return res.status(404).json({
				message: "No lot found",
				success: false,
			});
		}

		const startTime = new Date();
		console.log(startTime);

		let slot = await Slot.findOne({
			userId: user._id,
			lotId: lot._id,
			status: true,
		});
		if (slot) {
			return res.status(400).json({
				message: "User already has a booking for this lot",
				success: false,
			});
		}

		slot = await Slot.find({ lotId: lot._id, status: false });
		if (!slot) {
			return res.status(404).json({
				message: "No empty slot found",
				success: false,
			});
		}

		slot[0].status = true;
		slot[0].userId = user._id;
		slot[0].details.vNumber = vNumber;
		slot[0].details.startTime = startTime;
		slot[0].details.color = color;

		await slot[0].save();

		if (!slot) {
			return res.status(400).json({
				message: "Error booking slot",
				success: false,
			});
		}
		const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
		user.verifyCode = verifyCode;
		user.isVerified = false;
		await user.save();

		const emailResponse = await sendVerificationEmail(
			email,
			user.name,
			verifyCode
		);
		if (!emailResponse.success) {
			return Response.json(
				{
					success: false,
					message: emailResponse.message,
				},
				{ status: 500 }
			);
		}
		return res.status(200).json({
			message: "Verify the code to confirm booking",
			success: true,
		});
	} catch (error) {
		console.log(error);
	}
};

export const parkOut = async (req, res) => {
	try {
		const { lotName, vNumber } = req.body;
		if (!lotName || !vNumber) {
			return res.status(400).json({
				message: "Somethings is missing",
				success: false,
			});
		}

		const lot = await Lot.findOne({ lotName });
		console.log(lot);

		const slot = await Slot.findOne({
			lotId: lot._id,
			status: true,
			"details.vNumber": vNumber,
		});

		if (!slot) {
			return res.status(404).json({
				message: "No slot found with this vehicle number",
				success: false,
			});
		}

		const user = await User.findByIdAndUpdate(
			slot.userId,
			{ isVerified: false },
			{ new: true }
		);
		const endTime = Date.now();
		const newSlot = slot;
		newSlot.details.endTime = endTime;
		slot.status = false;
		await slot.save();

		return res.status(200).json({
			message: "Slot parked out successfully",
			success: true,
			slot: newSlot,
		});
	} catch (error) {
		console.log(error);
	}
};

export const isBookingVerified = async (req, res) => {
	try {
		const { email } = req.body;
		console.log("isBookingVerified", email);

		const user = await User.findOne({ email });
		if (!user) {
			return res.status(404).json({
				message: "No user found",
				success: false,
			});
		}

		if (!user.isVerified) {
			const slot = await Slot.findOne({ userId: user._id });
			slot.status = false;
			await slot.save();
			return res.status(401).json({
				message: "Booking cannot be processed because the user is not verified",
				success: false,
			});
		}

		return res.status(200).json({
			message: "Booking verified",
			success: true,
		});
	} catch (error) {
		console.log(error);
	}
};
