import type { NextFunction, Response } from "express";

import { verifyAccessToken } from "../utils/jwt.js";
import type { AuthenticatedRequest } from "../modules/auth/auth.types.js";

export const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  const authorization = req.headers.authorization;

  if (!authorization?.startsWith("Bearer ")) {
    res.status(401).json({
      success: false,
      message: "Authentication required",
    });
    return;
  }

  const token = authorization.slice(7);

  try {
    const payload = verifyAccessToken(token);

    req.user = {
      userId: payload.userId,
      businessId: payload.businessId,
      roleId: payload.roleId,
    };

    next();
  } catch {
    res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};