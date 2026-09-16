import type { Request } from "express";
export interface AuthenticatedRequest extends Request {
    user?: {
        userId: string;
        businessId: string;
        roleId: string;
    };
}
//# sourceMappingURL=auth.types.d.ts.map