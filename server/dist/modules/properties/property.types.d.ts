import type { Request } from "express";
export interface PropertyRequest extends Request {
    user?: {
        userId: string;
        businessId: string;
        roleId: string;
    };
}
//# sourceMappingURL=property.types.d.ts.map