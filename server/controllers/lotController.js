import Lot from "../models/lot.js";
import LotAddress from "../models/lotAddress.js";

export const registerLot = async (req, res) => {
	try {
		const {
			lotName,
			capacity,
			hourlyRate,
			long,
			lat,
			street,
			city,
			state,
			zip,
			country,
		} = req.body;

		if (
			!lotName ||
			!capacity ||
			!hourlyRate ||
			!long ||
			!lat ||
			!street ||
			!city ||
			!state ||
			!zip ||
			!country
		) {
			return res.status(400).json({ message: "Something is missing" });
		}

		const lotAddress = await LotAddress.create({
			street,
			city,
			state,
			zip,
			country,
		});

		if (!lotAddress) {
			return res.status(500).json({
				message: "Failed to create lot address",
				success: false,
			});
		}

		const lot = await Lot.create({
			lotName,
			capacity,
			hourlyRate,
			availableSpaces: capacity,
			lotAddress: lotAddress._id,
			location: {
				type: "Point",
				coordinates: [long, lat],
			},
		});

		if (!lot) {
			return res.status(500).json({
				message: "Failed to create lot",
				success: false,
			});
		}

		return res.status(201).json({
			message: "Lot registered successfully",
			success: true,
			lot,
		});
	} catch (error) {
		console.log(error);
	}
};

export const getAllLots = async (req, res) => {
	try {
		const lots = await Lot.find();
		if (!lots)
			return res.status(404).json({
				message: "No lot registered",
				success: false,
			});
    console.log(lots);
    
		return res.status(200).json({
			message: "Lots retrieved successfully",
			success: true,
			lots,
		});
	} catch (error) {
		console.log(error);
	}
};
