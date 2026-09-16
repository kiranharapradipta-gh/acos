import { z } from "zod";
export declare const propertyListSchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    search: z.ZodOptional<z.ZodString>;
    customerId: z.ZodOptional<z.ZodString>;
    sortBy: z.ZodDefault<z.ZodEnum<{
        city: "city";
        createdAt: "createdAt";
        name: "name";
    }>>;
    sortOrder: z.ZodDefault<z.ZodEnum<{
        asc: "asc";
        desc: "desc";
    }>>;
}, z.core.$strip>;
export declare const createPropertySchema: z.ZodObject<{
    customerId: z.ZodString;
    name: z.ZodString;
    address: z.ZodString;
    city: z.ZodOptional<z.ZodString>;
    postalCode: z.ZodOptional<z.ZodString>;
    latitude: z.ZodOptional<z.ZodNumber>;
    longitude: z.ZodOptional<z.ZodNumber>;
    notes: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const updatePropertySchema: z.ZodObject<{
    customerId: z.ZodOptional<z.ZodString>;
    name: z.ZodOptional<z.ZodString>;
    address: z.ZodOptional<z.ZodString>;
    city: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    postalCode: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    latitude: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    longitude: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    notes: z.ZodOptional<z.ZodOptional<z.ZodString>>;
}, z.core.$strip>;
//# sourceMappingURL=property.validation.d.ts.map