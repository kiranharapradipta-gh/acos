import type { Request } from "express";
export interface CustomerRequest extends Request {
    user?: {
        userId: string;
        businessId: string;
        roleId: string;
    };
}
//# sourceMappingURL=customer.types.d.ts.map