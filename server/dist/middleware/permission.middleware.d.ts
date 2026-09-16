import type { NextFunction, Response } from "express";
import type { AuthenticatedRequest } from "../modules/auth/auth.types.js";
export declare const requirePermission: (permissionCode: string) => (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=permission.middleware.d.ts.map