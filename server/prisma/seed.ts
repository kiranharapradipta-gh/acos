import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import "dotenv/config";

import { hashPassword } from "../src/utils/password.js";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
});

const permissions = [
  {
    code: "dashboard.read",
    name: "View Dashboard",
    description: "View dashboard",
  },

  {
    code: "customer.read",
    name: "View Customers",
    description: "View customers",
  },
  {
    code: "customer.create",
    name: "Create Customers",
    description: "Create customers",
  },
  {
    code: "customer.update",
    name: "Update Customers",
    description: "Update customers",
  },
  {
    code: "customer.delete",
    name: "Delete Customers",
    description: "Delete customers",
  },

  {
    code: "property.read",
    name: "View Properties",
    description: "View customer properties",
  },
  {
    code: "property.create",
    name: "Create Properties",
    description: "Create properties",
  },
  {
    code: "property.update",
    name: "Update Properties",
    description: "Update properties",
  },
  {
    code: "property.delete",
    name: "Delete Properties",
    description: "Delete properties",
  },

  {
    code: "ac_unit.read",
    name: "View AC Units",
    description: "View AC units",
  },
  {
    code: "ac_unit.create",
    name: "Create AC Units",
    description: "Create AC units",
  },
  {
    code: "ac_unit.update",
    name: "Update AC Units",
    description: "Update AC units",
  },
  {
    code: "ac_unit.delete",
    name: "Delete AC Units",
    description: "Delete AC units",
  },

  {
    code: "service.read",
    name: "View Services",
    description: "View services",
  },
  {
    code: "service.create",
    name: "Create Services",
    description: "Create services",
  },
  {
    code: "service.update",
    name: "Update Services",
    description: "Update services",
  },
  {
    code: "service.delete",
    name: "Delete Services",
    description: "Delete services",
  },

  {
    code: "service_request.read",
    name: "View Service Requests",
    description: "View service requests",
  },
  {
    code: "service_request.create",
    name: "Create Service Requests",
    description: "Create service requests",
  },
  {
    code: "service_request.update",
    name: "Update Service Requests",
    description: "Update service requests",
  },
  {
    code: "service_request.delete",
    name: "Delete Service Requests",
    description: "Delete service requests",
  },

  {
    code: "work_order.read",
    name: "View Work Orders",
    description: "View work orders",
  },
  {
    code: "work_order.create",
    name: "Create Work Orders",
    description: "Create work orders",
  },
  {
    code: "work_order.update",
    name: "Update Work Orders",
    description: "Update work orders",
  },
  {
    code: "work_order.delete",
    name: "Delete Work Orders",
    description: "Delete work orders",
  },

  {
    code: "technician.read",
    name: "View Technicians",
    description: "View technicians",
  },
  {
    code: "technician.create",
    name: "Create Technicians",
    description: "Create technicians",
  },
  {
    code: "technician.update",
    name: "Update Technicians",
    description: "Update technicians",
  },
  {
    code: "technician.delete",
    name: "Delete Technicians",
    description: "Delete technicians",
  },

  {
    code: "inventory.read",
    name: "View Inventory",
    description: "View inventory",
  },
  {
    code: "inventory.create",
    name: "Create Inventory Items",
    description: "Create inventory items",
  },
  {
    code: "inventory.update",
    name: "Update Inventory",
    description: "Update inventory items",
  },
  {
    code: "inventory.delete",
    name: "Delete Inventory Items",
    description: "Delete inventory items",
  },

  {
    code: "invoice.read",
    name: "View Invoices",
    description: "View invoices",
  },
  {
    code: "invoice.create",
    name: "Create Invoices",
    description: "Create invoices",
  },
  {
    code: "invoice.update",
    name: "Update Invoices",
    description: "Update invoices",
  },

  {
    code: "payment.read",
    name: "View Payments",
    description: "View payments",
  },
  {
    code: "payment.create",
    name: "Create Payments",
    description: "Create payments",
  },

  {
    code: "maintenance.read",
    name: "View Maintenance",
    description: "View maintenance contracts",
  },
  {
    code: "maintenance.create",
    name: "Create Maintenance",
    description: "Create maintenance contracts",
  },
  {
    code: "maintenance.update",
    name: "Update Maintenance",
    description: "Update maintenance contracts",
  },
  {
    code: "maintenance.delete",
    name: "Delete Maintenance",
    description: "Delete maintenance contracts",
  },
];

async function main() {
  console.log("🌱 Starting database seed...");

  const business = await prisma.business.upsert({
    where: {
      code: "AC-DEMO",
    },
    update: {},
    create: {
      code: "AC-DEMO",
      name: "AC Service Demo",
      phone: "081234567890",
      email: "demo@acservice.local",
    },
  });

  console.log(`✓ Business: ${business.name}`);

  const permissionRecords = [];

  for (const permission of permissions) {
    const record = await prisma.permission.upsert({
      where: {
        code: permission.code,
      },
      update: {
        name: permission.name,
        description: permission.description,
      },
      create: permission,
    });

    permissionRecords.push(record);
  }

  console.log(`✓ Permissions: ${permissionRecords.length}`);

  const role = await prisma.role.upsert({
    where: {
      businessId_code: {
        businessId: business.id,
        code: "OWNER",
      },
    },
    update: {
      name: "Owner",
      description: "Business owner",
    },
    create: {
      businessId: business.id,
      code: "OWNER",
      name: "Owner",
      description: "Business owner",
    },
  });

  console.log(`✓ Role: ${role.name}`);

  for (const permission of permissionRecords) {
    await prisma.rolePermission.upsert({
      where: {
        roleId_permissionId: {
          roleId: role.id,
          permissionId: permission.id,
        },
      },
      update: {},
      create: {
        roleId: role.id,
        permissionId: permission.id,
      },
    });
  }

  console.log("✓ Owner permissions assigned");

  const passwordHash = await hashPassword("rahasia");

  const admin = await prisma.user.upsert({
    where: {
      businessId_username: {
        businessId: business.id,
        username: "admin",
      },
    },
    update: {
      name: "Administrator",
      passwordHash,
      status: "ACTIVE",
      roleId: role.id,
    },
    create: {
      businessId: business.id,
      roleId: role.id,
      name: "Administrator",
      username: "admin",
      email: "admin@acservice.local",
      passwordHash,
      status: "ACTIVE",
    },
  });

  console.log(`✓ Admin: ${admin.username}`);

  console.log("");
  console.log("🎉 Seed completed successfully!");
  console.log("");
  console.log("Login:");
  console.log("  username: admin");
  console.log("  password: rahasia");
}

main()
  .catch((error) => {
    console.error("❌ Seed failed:");
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });