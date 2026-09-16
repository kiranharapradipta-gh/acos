import { z } from "zod";

export const propertyListSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),

  search: z.string().trim().optional(),

  customerId: z.string().trim().min(1).optional(),

  sortBy: z
    .enum(["name", "city", "createdAt"])
    .default("createdAt"),

  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

export const createPropertySchema = z.object({
  customerId: z.string().trim().min(1),

  name: z.string().trim().min(1).max(150),

  address: z.string().trim().min(1).max(500),

  city: z.string().trim().max(100).optional(),

  postalCode: z.string().trim().max(20).optional(),

  latitude: z.number().min(-90).max(90).optional(),

  longitude: z.number().min(-180).max(180).optional(),

  notes: z.string().trim().max(2000).optional(),
});

export const updatePropertySchema = createPropertySchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required",
  });