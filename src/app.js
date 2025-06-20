import "dotenv/config";
import express from "express";
import { morganMiddleware } from "./config/winston.js";
import { errorHandler } from "./middleware/errorHandler.js";

//Import Routes
import taskRoutes from "./routes/task.routes.js";

// Connect to MongoDB
import connectDB from "./config/connectDB.js";
import { ApiError } from "./utils/ApiError.js";
connectDB();

// Initialize Express app
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morganMiddleware);

// Routes
app.use("/tasks", taskRoutes);

// Health check route
app.get("/", (_req, res) => {
  res.status(200).json({ success: true, message: "Server is healthy" });
});

//Catch-all route for undefined routes
app.use((req, _res, next) => {
  const method = req.method;
  const url = req.originalUrl;
  next(new ApiError(`Cannot find method: ${method} for endpoint: ${url}`, 404));
});

// Middleware to handle errors
app.use(errorHandler);

export default app;
