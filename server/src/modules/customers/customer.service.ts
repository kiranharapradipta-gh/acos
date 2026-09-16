import type { Prisma } from "@prisma/client";
import { CustomerStatus } from "@prisma/client";
import { prisma } from "../../config/database.js";

interface ListCustomersInput {
  businessId: string;
  page: number;
  limit: number;
  search?: string | undefined;
  status?: CustomerStatus | undefined;
  sortBy:
    | "name"
    | "customerCode"
    | "createdAt"
    | "totalOrders"
    | "totalSpent";
  sortOrder: "asc" | "desc";
}

export const listCustomers = async ({
  businessId,
  page,
  limit,
  search,
  status,
  sortBy,
  sortOrder,
}: ListCustomersInput) => {
  const skip = (page - 1) * limit;

  const where: Prisma.CustomerWhereInput = {
    businessId,
  };

  if (status) {
    where.status = status;
  }

  if (search) {
    where.OR = [
      {
        customerCode: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        name: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        phone: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        whatsapp: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        email: {
          contains: search,
          mode: "insensitive",
        },
      },
    ];
  }

  const [customers, total] = await prisma.$transaction([
    prisma.customer.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        [sortBy]: sortOrder,
      },
    }),
    prisma.customer.count({ where }),
  ]);

  return {
    data: customers,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const getCustomerById = async (
  businessId: string,
  customerId: string,
) => {
  return prisma.customer.findFirst({
    where: {
      id: customerId,
      businessId,
    },
    include: {
      addresses: true,
      properties: {
        include: {
          acUnits: true,
        },
      },
    },
  });
};

export const createCustomer = async (
  businessId: string,
  data: {
    customerCode: string;
    name: string;
    phone?: string | undefined;
    whatsapp?: string | undefined;
    email?: string | undefined;
    notes?: string | undefined;
    status?: CustomerStatus | undefined;
  },
) => {
  const existing = await prisma.customer.findFirst({
    where: {
      businessId,
      customerCode: data.customerCode,
    },
  });

  if (existing) {
    throw new Error("Customer code already exists");
  }

  return prisma.customer.create({
    data: {
      businessId,
      customerCode: data.customerCode,
      name: data.name,
      ...(data.phone !== undefined && { phone: data.phone }),
      ...(data.whatsapp !== undefined && { whatsapp: data.whatsapp }),
      ...(data.email !== undefined && { email: data.email }),
      ...(data.notes !== undefined && { notes: data.notes }),
      status: data.status ?? CustomerStatus.ACTIVE,
    },
  });
};

export const updateCustomer = async (
  businessId: string,
  customerId: string,
  data: {
    customerCode?: string | undefined;
    name?: string | undefined;
    phone?: string | undefined;
    whatsapp?: string | undefined;
    email?: string | undefined;
    notes?: string | undefined;
    status?: CustomerStatus | undefined;
  },
) => {
  const customer = await prisma.customer.findFirst({
    where: {
      id: customerId,
      businessId,
    },
  });

  if (!customer) {
    return null;
  }

  if (
    data.customerCode &&
    data.customerCode !== customer.customerCode
  ) {
    const duplicate = await prisma.customer.findFirst({
      where: {
        businessId,
        customerCode: data.customerCode,
        NOT: {
          id: customerId,
        },
      },
    });

    if (duplicate) {
      throw new Error("Customer code already exists");
    }
  }

  const updateData: Prisma.CustomerUpdateInput = {};

  if (data.customerCode !== undefined) {
    updateData.customerCode = data.customerCode;
  }

  if (data.name !== undefined) {
    updateData.name = data.name;
  }

  if (data.phone !== undefined) {
    updateData.phone = data.phone;
  }

  if (data.whatsapp !== undefined) {
    updateData.whatsapp = data.whatsapp;
  }

  if (data.email !== undefined) {
    updateData.email = data.email;
  }

  if (data.notes !== undefined) {
    updateData.notes = data.notes;
  }

  if (data.status !== undefined) {
    updateData.status = data.status;
  }

  return prisma.customer.update({
    where: {
      id: customerId,
    },
    data: updateData,
  });
};

export const deleteCustomer = async (
  businessId: string,
  customerId: string,
) => {
  const customer = await prisma.customer.findFirst({
    where: {
      id: customerId,
      businessId,
    },
  });

  if (!customer) {
    return null;
  }

  return prisma.customer.delete({
    where: {
      id: customerId,
    },
  });
};