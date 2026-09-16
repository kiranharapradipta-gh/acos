import { Prisma } from "@prisma/client";
interface ListPropertiesInput {
    businessId: string;
    page: number;
    limit: number;
    search?: string | undefined;
    customerId?: string | undefined;
    sortBy: "name" | "city" | "createdAt";
    sortOrder: "asc" | "desc";
}
interface CreatePropertyInput {
    customerId: string;
    name: string;
    address: string;
    city?: string | undefined;
    postalCode?: string | undefined;
    latitude?: number | undefined;
    longitude?: number | undefined;
    notes?: string | undefined;
}
interface UpdatePropertyInput {
    customerId?: string | undefined;
    name?: string | undefined;
    address?: string | undefined;
    city?: string | undefined;
    postalCode?: string | undefined;
    latitude?: number | undefined;
    longitude?: number | undefined;
    notes?: string | undefined;
}
export declare const listProperties: ({ businessId, page, limit, search, customerId, sortBy, sortOrder, }: ListPropertiesInput) => Promise<{
    data: ({
        _count: {
            acUnits: number;
        };
        customer: {
            customerCode: string;
            id: string;
            name: string;
        };
    } & {
        id: string;
        customerId: string;
        name: string;
        address: string;
        city: string | null;
        province: string | null;
        postalCode: string | null;
        latitude: Prisma.Decimal | null;
        longitude: Prisma.Decimal | null;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
    })[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}>;
export declare const getPropertyById: (businessId: string, propertyId: string) => Promise<({
    acUnits: {
        id: string;
        propertyId: string;
        unitCode: string;
        brand: string | null;
        model: string | null;
        serialNumber: string | null;
        type: import("@prisma/client").$Enums.ACUnitType;
        capacityBtu: number | null;
        capacityPk: Prisma.Decimal | null;
        refrigerant: string | null;
        installationDate: Date | null;
        warrantyUntil: Date | null;
        status: import("@prisma/client").$Enums.ACUnitStatus;
        location: string | null;
        floor: string | null;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
    }[];
    customer: {
        customerCode: string;
        email: string | null;
        id: string;
        name: string;
        phone: string | null;
        whatsapp: string | null;
    };
} & {
    id: string;
    customerId: string;
    name: string;
    address: string;
    city: string | null;
    province: string | null;
    postalCode: string | null;
    latitude: Prisma.Decimal | null;
    longitude: Prisma.Decimal | null;
    notes: string | null;
    createdAt: Date;
    updatedAt: Date;
}) | null>;
export declare const createProperty: (businessId: string, data: CreatePropertyInput) => Promise<{
    id: string;
    customerId: string;
    name: string;
    address: string;
    city: string | null;
    province: string | null;
    postalCode: string | null;
    latitude: Prisma.Decimal | null;
    longitude: Prisma.Decimal | null;
    notes: string | null;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare const updateProperty: (businessId: string, propertyId: string, data: UpdatePropertyInput) => Promise<{
    id: string;
    customerId: string;
    name: string;
    address: string;
    city: string | null;
    province: string | null;
    postalCode: string | null;
    latitude: Prisma.Decimal | null;
    longitude: Prisma.Decimal | null;
    notes: string | null;
    createdAt: Date;
    updatedAt: Date;
} | null>;
export declare const deleteProperty: (businessId: string, propertyId: string) => Promise<{
    id: string;
    customerId: string;
    name: string;
    address: string;
    city: string | null;
    province: string | null;
    postalCode: string | null;
    latitude: Prisma.Decimal | null;
    longitude: Prisma.Decimal | null;
    notes: string | null;
    createdAt: Date;
    updatedAt: Date;
} | null>;
export {};
//# sourceMappingURL=property.service.d.ts.map