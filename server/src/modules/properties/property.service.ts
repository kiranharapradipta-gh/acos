import { Prisma } from "@prisma/client";

import { prisma } from "../../config/database.js";

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

export const listProperties = async ({
  businessId,
  page,
  limit,
  search,
  customerId,
  sortBy,
  sortOrder,
}: ListPropertiesInput) => {
  const skip = (page - 1) * limit;

  const where: Prisma.PropertyWhereInput = {
    customer: {
      businessId,
    },
  };

  if (customerId) {
    where.customerId = customerId;
  }

  if (search) {
    where.OR = [
      {
        name: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        address: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        city: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        postalCode: {
          contains: search,
          mode: "insensitive",
        },
      },
    ];
  }

  const [properties, total] = await prisma.$transaction([
    prisma.property.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        [sortBy]: sortOrder,
      },
      include: {
        customer: {
          select: {
            id: true,
            customerCode: true,
            name: true,
          },
        },
        _count: {
          select: {
            acUnits: true,
          },
        },
      },
    }),

    prisma.property.count({
      where,
    }),
  ]);

  return {
    data: properties,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const getPropertyById = async (
  businessId: string,
  propertyId: string,
) => {
  return prisma.property.findFirst({
    where: {
      id: propertyId,
      customer: {
        businessId,
      },
    },
    include: {
      customer: {
        select: {
          id: true,
          customerCode: true,
          name: true,
          phone: true,
          whatsapp: true,
          email: true,
        },
      },
      acUnits: true,
    },
  });
};

export const createProperty = async (
  businessId: string,
  data: CreatePropertyInput,
) => {
  const customer = await prisma.customer.findFirst({
    where: {
      id: data.customerId,
      businessId,
    },
  });

  if (!customer) {
    throw new Error("Customer not found");
  }

  return prisma.property.create({
    data: {
      businessId,
      customerId: data.customerId,
      name: data.name,
      address: data.address,

      ...(data.city !== undefined && {
        city: data.city,
      }),

      ...(data.postalCode !== undefined && {
        postalCode: data.postalCode,
      }),

      ...(data.latitude !== undefined && {
        latitude: data.latitude,
      }),

      ...(data.longitude !== undefined && {
        longitude: data.longitude,
      }),

      ...(data.notes !== undefined && {
        notes: data.notes,
      }),
    },
  });
};

export const updateProperty = async (
  businessId: string,
  propertyId: string,
  data: UpdatePropertyInput,
) => {
  const property = await prisma.property.findFirst({
    where: {
      id: propertyId,
      customer: {
          businessId,
        },
    },
  });

  if (!property) {
    return null;
  }

  if (data.customerId !== undefined) {
    const customer = await prisma.customer.findFirst({
      where: {
        id: data.customerId,
        customer: {
          businessId,
        },
      },
    });

    if (!customer) {
      throw new Error("Customer not found");
    }
  }

  const updateData: Prisma.PropertyUpdateInput = {};

  if (data.customerId !== undefined) {
    updateData.customer = {
      connect: {
        id: data.customerId,
      },
    };
  }

  if (data.name !== undefined) {
    updateData.name = data.name;
  }

  if (data.address !== undefined) {
    updateData.address = data.address;
  }

  if (data.city !== undefined) {
    updateData.city = data.city;
  }

  if (data.postalCode !== undefined) {
    updateData.postalCode = data.postalCode;
  }

  if (data.latitude !== undefined) {
    updateData.latitude = data.latitude;
  }

  if (data.longitude !== undefined) {
    updateData.longitude = data.longitude;
  }

  if (data.notes !== undefined) {
    updateData.notes = data.notes;
  }

  return prisma.property.update({
    where: {
      id: propertyId,
    },
    data: updateData,
  });
};

export const deleteProperty = async (
  businessId: string,
  propertyId: string,
) => {
  const property = await prisma.property.findFirst({
    where: {
      id: propertyId,
      customer: {
        businessId,
      },
    },
  });

  if (!property) {
    return null;
  }

  return prisma.property.delete({
    where: {
      id: propertyId,
    },
  });
};