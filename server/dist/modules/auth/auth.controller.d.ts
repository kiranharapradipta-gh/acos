import type { Request, Response } from "express";
import type { AuthenticatedRequest } from "./auth.types.js";
export declare const loginController: (req: Request, res: Response) => Promise<void>;
export declare const meController: (req: AuthenticatedRequest, res: Response) => Promise<void>;
export declare const changePasswordController: (req: AuthenticatedRequest, res: Response) => Promise<void>;
export declare const logoutController: (_req: AuthenticatedRequest, res: Response) => Promise<void>;
//# sourceMappingURL=auth.controller.d.ts.map