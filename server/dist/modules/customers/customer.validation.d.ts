import { z } from "zod";
export declare const customerStatusSchema: z.ZodEnum<{
    ACTIVE: "ACTIVE";
    BLOCKED: "BLOCKED";
    INACTIVE: "INACTIVE";
}>;
export declare const customerListSchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    search: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<{
        ACTIVE: "ACTIVE";
        BLOCKED: "BLOCKED";
        INACTIVE: "INACTIVE";
    }>>;
    sortBy: z.ZodDefault<z.ZodEnum<{
        createdAt: "createdAt";
        customerCode: "customerCode";
        name: "name";
        totalOrders: "totalOrders";
        totalSpent: "totalSpent";
    }>>;
    sortOrder: z.ZodDefault<z.ZodEnum<{
        asc: "asc";
        desc: "desc";
    }>>;
}, z.core.$strip>;
export declare const createCustomerSchema: z.ZodObject<{
    customerCode: z.ZodString;
    name: z.ZodString;
    phone: z.ZodOptional<z.ZodString>;
    whatsapp: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodString>;
    notes: z.ZodOptional<z.ZodString>;
    status: z.ZodDefault<z.ZodEnum<{
        ACTIVE: "ACTIVE";
        BLOCKED: "BLOCKED";
        INACTIVE: "INACTIVE";
    }>>;
}, z.core.$strip>;
export declare const updateCustomerSchema: z.ZodObject<{
    customerCode: z.ZodOptional<z.ZodString>;
    name: z.ZodOptional<z.ZodString>;
    phone: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    whatsapp: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    email: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    notes: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    status: z.ZodOptional<z.ZodDefault<z.ZodEnum<{
        ACTIVE: "ACTIVE";
        BLOCKED: "BLOCKED";
        INACTIVE: "INACTIVE";
    }>>>;
}, z.core.$strip>;
//# sourceMappingURL=customer.validation.d.ts.map