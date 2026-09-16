import type { Request, Response } from "express";

import {
  changePassword,
  getMe,
  login,
} from "./auth.service.js";
import {
  changePasswordSchema,
  loginSchema,
} from "./auth.validation.js";
import type { AuthenticatedRequest } from "./auth.types.js";

export const loginController = async (
  req: Request,
  res: Response,
) => {
  const parsed = loginSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({
      success: false,
      message: "Invalid request body",
      errors: parsed.error.flatten().fieldErrors,
    });
    return;
  }

  try {
    const result = await login(parsed.data);

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Login failed";

    res.status(401).json({
      success: false,
      message,
    });
  }
};

export const meController = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  if (!req.user) {
    res.status(401).json({
      success: false,
      message: "Authentication required",
    });
    return;
  }

  try {
    const user = await getMe(req.user.userId);

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to get user";

    res.status(404).json({
      success: false,
      message,
    });
  }
};

export const changePasswordController = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  if (!req.user) {
    res.status(401).json({
      success: false,
      message: "Authentication required",
    });
    return;
  }

  const parsed = changePasswordSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({
      success: false,
      message: "Invalid request body",
      errors: parsed.error.flatten().fieldErrors,
    });
    return;
  }

  try {
    await changePassword(
      req.user.userId,
      parsed.data.currentPassword,
      parsed.data.newPassword,
    );

    res.json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to change password";

    res.status(400).json({
      success: false,
      message,
    });
  }
};

export const logoutController = async (
  _req: AuthenticatedRequest,
  res: Response,
) => {
  res.json({
    success: true,
    message: "Logged out successfully",
  });
};