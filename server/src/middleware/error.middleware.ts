import type {
  ErrorRequestHandler,
  Request,
  Response,
} from "express";

export const errorMiddleware: ErrorRequestHandler = (
  error,
  _req: Request,
  res: Response,
  _next,
) => {
  console.error(error);

  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
};