import { celebrate, Segments } from "celebrate";
import Joi from "joi";

const celebrateOptions = {
  abortEarly: false,
};

export const createTaskValidator = celebrate(
  {
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string().min(3).max(100).required().messages({
        "string.base": "Title must be a string",
        "string.empty": "Title is required",
        "string.min": "Title must be at least 3 characters",
        "string.max": "Title must be at most 100 characters",
      }),
      description: Joi.string().min(5).max(500).optional().messages({
        "string.base": "Description must be a string",
        "string.min": "Description must be at least 5 characters",
        "string.max": "Description must be at most 500 characters",
      }),
      dueDate: Joi.date().iso().required().messages({
        "date.base": "Due date must be a valid ISO date string",
        "date.format": "Date must be in ISO format",
        "any.required": "Due date is required",
      }),
      completed: Joi.boolean().default(false),
    }),
  },
  celebrateOptions
);

export const updateTaskStatusValidator = celebrate(
  {
    [Segments.PARAMS]: Joi.object().keys({
      taskId: Joi.string().required().messages({
        "string.base": "Task ID must be a string",
        "string.empty": "Task ID is required",
      }),
    }),
  },
  celebrateOptions
);

export const deleteTaskValidator = celebrate(
  {
    [Segments.PARAMS]: Joi.object().keys({
      taskId: Joi.string().required().messages({
        "string.base": "Task ID must be a string",
        "string.empty": "Task ID is required",
      }),
    }),
  },
  celebrateOptions
);
