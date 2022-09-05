import express from "express";
import UserRoutes from "./routes/User.routes.js";
import CourseRoutes from "./routes/Course.routes.js";
import * as dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.use("/user", UserRoutes);
app.use("/course", CourseRoutes);

// app.use("*", (req, res) => {
// 	res.status(404).json({
// 		success: false,
// 		message: "Path Not Found",
// 	});
// });

app.use((err, req, res, next) => {
	const statusCode = err.statusCode || 500;
	res.status(statusCode).json({
		success: false,
		message: err.message,
		// stack: err.stack,
	});
});

export default app;
