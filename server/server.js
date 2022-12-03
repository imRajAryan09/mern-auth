require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const PORT = 5000 || process.env.PORT;
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");

// import routes
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");

// app middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cors());

if (process.env.NODE_ENV === "development") {
	app.use(
		cors({
			origin: process.env.CLIENT_URL,
			methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
		})
	);
}

// middlewares
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);

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
