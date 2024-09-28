import Contact from "../models/contactModel.js";
import User from "../models/user.js";

export const register = async (req, res) => {
	try {
		const { name, email, phoneNumber } = req.body;
		if (!name || !email || !phoneNumber) {
			return res.status(400).json({
				message: "Something is missing.",
				success: false,
			});
		}

		let user = await User.findOne({ email });
		if (user) {
			return res.status(400).json({
				message: "Email already registered",
				success: false,
			});
		}

		const dataQuery = {
			name,
			email,
			phoneNumber,
		};
		user = await User.create(dataQuery);

		user = {
			_id: user._id,
			name: user.name,
			email: user.email,
			phoneNumber: user.phoneNumber,
		};

		return res.status(201).json({
			message: "Account created successfully",
			success: true,
			user,
		});
	} catch (error) {
		console.log(error);
	}
};

export const contactUs = async (req, res) => {
	try {
		const { email, message } = req.body;
		const contact = await Contact.create({ email, message });
		if (!contact) {
			return res.status(400).json({
				message: "Failed to send message",
				success: false,
			});
		}
		res.status(201).json({
			message: "Message sent successfully",
			success: true,
		});
	} catch (error) {
		console.log(error);
	}
};
