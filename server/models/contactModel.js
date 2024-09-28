import { model, Schema } from "mongoose";

const contactSchema = new Schema({
	email: {
		type: String,
		required: true,
	},
	message: {
		type: String,
		required: true,
	},
});

const Contact = model("Contact", contactSchema);

export default Contact;
