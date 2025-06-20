import { Router } from "express";

import {
  createTaskValidator,
  deleteTaskValidator,
  updateTaskStatusValidator,
} from "../validator/task.validator.js";

import {
  createTaskController,
  deleteTaskController,
  getAllTasksController,
  updateTaskStatusController,
} from "../controllers/task.controllers.js";

const router = Router();

// Route to create a new task
router.post("/", createTaskValidator, createTaskController);

// Route to get all tasks
router.get("/", getAllTasksController);

// Route to update a task completion status
router.patch("/:taskId", updateTaskStatusValidator, updateTaskStatusController);

// Route to delete a task
router.delete("/:taskId", deleteTaskValidator, deleteTaskController);

export default router;
