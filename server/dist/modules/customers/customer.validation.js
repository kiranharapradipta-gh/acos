import { CustomerStatus } from "@prisma/client";
import { z } from "zod";
export const customerStatusSchema = z.enum(Object.values(CustomerStatus));
export const customerListSchema = z.object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(100).default(20),
    search: z.string().trim().optional(),
    status: customerStatusSchema.optional(),
    sortBy: z
        .enum([
        "name",
        "customerCode",
        "createdAt",
        "totalOrders",
        "totalSpent",
    ])
        .default("createdAt"),
    sortOrder: z.enum(["asc", "desc"]).default("desc"),
});
export const createCustomerSchema = z.object({
    customerCode: z.string().trim().min(1).max(50),
    name: z.string().trim().min(1).max(150),
    phone: z.string().trim().max(30).optional(),
    whatsapp: z.string().trim().max(30).optional(),
    email: z.string().trim().email().max(150).optional(),
    notes: z.string().trim().max(2000).optional(),
    status: customerStatusSchema.default(CustomerStatus.ACTIVE),
});
export const updateCustomerSchema = createCustomerSchema
    .partial()
    .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required",
});
//# sourceMappingURL=customer.validation.js.map