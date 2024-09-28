import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
dotenv.config();
import path from "path";
import lotRoute from "./routes/lotRoute.js";
import slotRoute from "./routes/slotRoute.js";
import userRoute from "./routes/userRoute.js";

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
	origin: "*",
	credentials: true,
};
app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, "../Frontend/dist")));

//API
app.use("/api/v1/lot", lotRoute);
app.use("/api/v1/slot", slotRoute);
app.use("/api/v1/user", userRoute);
//For Deploying
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "../Frontend", "dist", "index.html"));
});

app.listen(PORT, () => {
	connectDB();
	console.log(`Server running at port: ${PORT}`);
});
