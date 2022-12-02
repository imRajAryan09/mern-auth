require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const authRoutes = require("./routes/auth.routes");
const PORT = 5000 || process.env.PORT;
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");

// app middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cors());

if (process.env.NODE_ENV === "development") {
	app.use(
		cors({
			origin: process.env.CLIENT_URL,
		})
	);
}

// middlewares
app.use("/api/v1/auth", authRoutes);

const startServer = async () => {
	try {
		await connectDB(process.env.MONGO_URI);
		app.listen(PORT, () => {
			console.log(
				`Server is running on port ${PORT} - ${process.env.NODE_ENV}`
			);
		});
	} catch {
		console.log("Error");
	}
};

startServer();
