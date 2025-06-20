import { logger } from "../config/winston.js";
import { isCelebrateError } from "celebrate";
const log = logger.child({ file: "errorHandler.js" });

export const errorHandler = (err, req, res, next) => {
  const message = err.message || "Internal Server Error";
  const stack = process.env.NODE_ENV === "development" ? err.stack : undefined;

  // Joi validation error
  if (isCelebrateError(err)) {
    log.warn("Validation Error");

    const errorSources = ["body", "query", "params"];
    const errors = {};

    for (const source of errorSources) {
      const sourceError = err.details.get(source);
      if (sourceError?.details) {
        sourceError.details.forEach((detail) => {
          // console.log(detail);
          const key = detail.path.join(",");
          errors[key] = detail.message.replace(/["]/g, "");
        });
      }
    }

    return res.status(422).json({
      success: false,
      message: "Validation failed",
      errors,
    });
  }

  if (err.isOperational) {
    log.warn("Operational Error", err);
    res.status(err.statusCode).json({
      success: false,
      message,
      stack,
    });
  } else {
    log.error("Unexpected Error", err);
    res.status(500).json({
      success: false,
      message,
      stack,
    });
  }
};
