import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import morgan from "morgan";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get today's date in YYYY-MM-DD format
const getLogFolderForToday = () => {
  const today = new Date().toISOString().split("T")[0]; // 'YYYY-MM-DD'
  const logDir = path.resolve(__dirname, `../logs/${today}`);
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }
  return logDir;
};

const logDir = getLogFolderForToday();

const { combine, timestamp, errors, colorize, json, splat, simple, align } =
  winston.format;

export const logger = winston.createLogger({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
  format: combine(
    timestamp({
      format: "YYYY-MM-DD hh:mm:ss.SSS A",
    }),
    errors({ stack: true }),
    colorize({ all: true }),
    splat(),
    align(),
    json()
  ),
  defaultMeta: { appName: "Task API" },
  transports: [
    new winston.transports.Console({
      format: combine(colorize(), simple()),
    }),
    new DailyRotateFile({
      filename: path.join(logDir, "combined-%DATE%.log"),
      datePattern: "YYYY-MM-DD",
      format: combine(timestamp(), json()),
    }),
    new DailyRotateFile({
      filename: path.join(logDir, "error-%DATE%.log"),
      level: "error",
      datePattern: "YYYY-MM-DD",
    }),
  ],
});

winston.add(
  new DailyRotateFile({
    filename: path.join(logDir, "exception-%DATE%.log"),
    handleExceptions: true,
  })
);

winston.add(
  new DailyRotateFile({
    filename: path.join(logDir, "rejections-%DATE%.log"),
    handleRejections: true,
  })
);

export const morganMiddleware = morgan(
  (tokens, req, res) => {
    const logData = {
      method: tokens.method(req, res),
      url: tokens.url(req, res),
      status: parseFloat(tokens.status(req, res)),
      contentLength: tokens.res(req, res, "content-length") || 0,
      responseTime: parseFloat(tokens["response-time"](req, res)),
    };
    return JSON.stringify(logData);
  },
  {
    stream: {
      write: (message) => {
        try {
          const data = JSON.parse(message);
          logger.http("incoming-request", data);
        } catch (err) {
          logger.error("Failed to parse morgan log message", { message, err });
        }
      },
    },
  }
);
