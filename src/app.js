import "dotenv/config";
import express from "express";
import { morganMiddleware } from "./config/winston.js";
import { errorHandler } from "./middleware/errorHandler.js";

//Import Routes
import taskRoutes from "./routes/task.routes.js";

// Connect to MongoDB
import connectDB from "./config/connectDB.js";
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

// Handle other requests
app.use((req, res, next) => {
  const method = req.method;
  const url = req.originalUrl;
  res.status(404).json({
    success: false,
    message: `Cannot find method: ${method} for ${url} - Not Found`,
  });
  next();
});

// Middleware to handle errors
app.use(errorHandler);

export default app;
