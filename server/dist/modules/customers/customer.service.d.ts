import type { Prisma } from "@prisma/client";
import { CustomerStatus } from "@prisma/client";
interface ListCustomersInput {
    businessId: string;
    page: number;
    limit: number;
    search?: string | undefined;
    status?: CustomerStatus | undefined;
    sortBy: "name" | "customerCode" | "createdAt" | "totalOrders" | "totalSpent";
    sortOrder: "asc" | "desc";
}
export declare const listCustomers: ({ businessId, page, limit, search, status, sortBy, sortOrder, }: ListCustomersInput) => Promise<{
    data: {
        id: string;
        businessId: string;
        customerCode: string;
        name: string;
        phone: string | null;
        whatsapp: string | null;
        email: string | null;
        status: import("@prisma/client").$Enums.CustomerStatus;
        notes: string | null;
        totalOrders: number;
        totalSpent: Prisma.Decimal;
        averageOrderValue: Prisma.Decimal;
        createdAt: Date;
        updatedAt: Date;
    }[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}>;
export declare const getCustomerById: (businessId: string, customerId: string) => Promise<({
    addresses: never;
    properties: ({
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
} & {
    id: string;
    businessId: string;
    customerCode: string;
    name: string;
    phone: string | null;
    whatsapp: string | null;
    email: string | null;
    status: import("@prisma/client").$Enums.CustomerStatus;
    notes: string | null;
    totalOrders: number;
    totalSpent: Prisma.Decimal;
    averageOrderValue: Prisma.Decimal;
    createdAt: Date;
    updatedAt: Date;
}) | null>;
export declare const createCustomer: (businessId: string, data: {
    customerCode: string;
    name: string;
    phone?: string | undefined;
    whatsapp?: string | undefined;
    email?: string | undefined;
    notes?: string | undefined;
    status?: CustomerStatus | undefined;
}) => Promise<{
    id: string;
    businessId: string;
    customerCode: string;
    name: string;
    phone: string | null;
    whatsapp: string | null;
    email: string | null;
    status: import("@prisma/client").$Enums.CustomerStatus;
    notes: string | null;
    totalOrders: number;
    totalSpent: Prisma.Decimal;
    averageOrderValue: Prisma.Decimal;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare const updateCustomer: (businessId: string, customerId: string, data: {
    customerCode?: string | undefined;
    name?: string | undefined;
    phone?: string | undefined;
    whatsapp?: string | undefined;
    email?: string | undefined;
    notes?: string | undefined;
    status?: CustomerStatus | undefined;
}) => Promise<{
    id: string;
    businessId: string;
    customerCode: string;
    name: string;
    phone: string | null;
    whatsapp: string | null;
    email: string | null;
    status: import("@prisma/client").$Enums.CustomerStatus;
    notes: string | null;
    totalOrders: number;
    totalSpent: Prisma.Decimal;
    averageOrderValue: Prisma.Decimal;
    createdAt: Date;
    updatedAt: Date;
} | null>;
export declare const deleteCustomer: (businessId: string, customerId: string) => Promise<{
    id: string;
    businessId: string;
    customerCode: string;
    name: string;
    phone: string | null;
    whatsapp: string | null;
    email: string | null;
    status: import("@prisma/client").$Enums.CustomerStatus;
    notes: string | null;
    totalOrders: number;
    totalSpent: Prisma.Decimal;
    averageOrderValue: Prisma.Decimal;
    createdAt: Date;
    updatedAt: Date;
} | null>;
export {};
//# sourceMappingURL=customer.service.d.ts.map