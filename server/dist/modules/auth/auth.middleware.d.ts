import type { NextFunction, Response } from "express";
import type { AuthenticatedRequest } from "../modules/auth/auth.types.js";
export declare const authMiddleware: (req: AuthenticatedRequest, res: Response, next: NextFunction) => void;
//# sourceMappingURL=auth.middleware.d.ts.map