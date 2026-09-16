import type { NextFunction, Response } from "express";

import { prisma } from "../config/database.js";
import type { AuthenticatedRequest } from "../modules/auth/auth.types.js";

export const requirePermission = (permissionCode: string) => {
  return async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ) => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Authentication required",
      });
      return;
    }

    try {
      const rolePermission = await prisma.rolePermission.findFirst({
        where: {
          roleId: req.user.roleId,
          permission: {
            code: permissionCode,
          },
        },
      });

      if (!rolePermission) {
        res.status(403).json({
          success: false,
          message: "You do not have permission to perform this action",
        });
        return;
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};