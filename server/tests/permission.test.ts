import { describe, expect, it, vi } from "vitest";

import { requirePermission } from "../src/middleware/permission.middleware.js";

const prismaMock = vi.hoisted(() => ({
  rolePermission: {
    findFirst: vi.fn(),
  },
}));

vi.mock("../src/config/database.js", () => ({
  prisma: prismaMock,
}));

describe("Permission Middleware", () => {
  it("allows user with required permission", async () => {
    prismaMock.rolePermission.findFirst.mockResolvedValue({
      roleId: "role-1",
      permissionId: "permission-1",
    });

    const req = {
      user: {
        userId: "user-1",
        businessId: "business-1",
        roleId: "role-1",
      },
    } as any;

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as any;

    const next = vi.fn();

    await requirePermission("customer.read")(req, res, next);

    expect(next).toHaveBeenCalledOnce();
    expect(res.status).not.toHaveBeenCalled();
  });

  it("rejects user without required permission", async () => {
    prismaMock.rolePermission.findFirst.mockResolvedValue(null);

    const req = {
      user: {
        userId: "user-1",
        businessId: "business-1",
        roleId: "role-1",
      },
    } as any;

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as any;

    const next = vi.fn();

    await requirePermission("customer.delete")(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(next).not.toHaveBeenCalled();
  });

  it("rejects unauthenticated request", async () => {
    const req = {} as any;

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as any;

    const next = vi.fn();

    await requirePermission("customer.read")(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });
});