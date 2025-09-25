import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/apiError";

export const globalErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Only log full stack in development
  if (process.env.NODE_ENV === "development") {
    console.error(err); // full error with stack
  } else {
    console.error("❌ Error:", err.message); // only message in prod
  }

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
};
