import {
  createTaskService,
  deleteTaskService,
  getAllTasksService,
  updateTaskStatusService,
} from "../services/task.services.js";
import { logger } from "../config/winston.js";

const log = logger.child({ file: "task.controllers.js" });

export const createTaskController = async (req, res) => {
  const taskData = req.body;

  const task = await createTaskService(taskData);
  log.info("Task created successfully", { taskId: task._id });
  res.status(201).json({
    success: true,
    message: "Task created successfully",
    data: { task },
  });
};

export const getAllTasksController = async (req, res) => {
  const query = req.query;
  log.info("Retrieving all tasks", { query });

  const completed = query.completed;

  const filter = {};

  if (completed) {
    filter.completed = completed === "true";
  }

  const { total, tasks } = await getAllTasksService(filter);
  log.info("Tasks retrieved successfully", { taskCount: tasks.length });
  res.status(200).json({
    success: true,
    message: "Tasks retrieved successfully",
    data: { total, tasks },
  });
};

export const updateTaskStatusController = async (req, res) => {
  const { taskId } = req.params;
  const task = await updateTaskStatusService(taskId);
  log.info("Task status updated successfully", {
    taskId: task._id,
    completed: task.completed,
  });
  res.status(200).json({
    success: true,
    message: "Task status updated successfully",
    data: { task },
  });
};

export const deleteTaskController = async (req, res) => {
  const { taskId } = req.params;
  await deleteTaskService(taskId);
  log.info("Task deleted successfully", { taskId });
  res.status(204).json();
};
