import Task from "../models/task.model.js";
import { ApiError } from "../utils/ApiError.js";
import { logger } from "../config/winston.js";

const log = logger.child({ file: "task.services.js" });

export const createTaskService = async (taskData) => {
  const task = await Task.create(taskData);
  if (!task) {
    log.error("Task creation failed");
    throw new ApiError("Task creation failed", 400);
  }
  return task;
};

export const getAllTasksService = async (filter) => {
  const tasks = await Task.find(filter).sort({ createdAt: -1 });

  const totalTasks = await Task.countDocuments(filter);
  return { total: totalTasks, tasks };
};

export const updateTaskStatusService = async (taskId) => {
  const task = await Task.findOne({ _id: taskId }).select(
    "-description -dueDate -title -createdAt"
  );
  if (!task) {
    log.warn(`Task with ID ${taskId} not found`);
    throw new ApiError("Task not found", 404);
  }
  task.completed = !task.completed;
  await task.save();
  return task;
};

export const deleteTaskService = async (taskId) => {
  const task = await Task.findOneAndDelete({ _id: taskId });
  if (!task) {
    throw new ApiError("Task not found or already deleted", 404);
  }
  return task;
};
