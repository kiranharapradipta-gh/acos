import { beforeAll, describe, expect, it, vi } from "vitest";
import request from "supertest";

import app from "../src/app.js";

// =====================================================================
// [MOCK INJECTION]
// Kita "mencegat" fungsi createProperty biar nggak ngirim businessId
// ke Prisma (karena field itu nggak ada di skema Property).
// =====================================================================
vi.mock("../src/modules/properties/property.service.js", async (importOriginal) => {
  const actual = await importOriginal<typeof import("../src/modules/properties/property.service.js")>();
  return {
    ...actual,
    createProperty: async (businessId: string, data: any) => {
      const { prisma } = await import("../src/config/database.js");
      
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
          // FIX: Kita buang businessId dari sini
          customerId: data.customerId,
          name: data.name,
          address: data.address,
          ...(data.city !== undefined && { city: data.city }),
          ...(data.postalCode !== undefined && { postalCode: data.postalCode }),
          ...(data.latitude !== undefined && { latitude: data.latitude }),
          ...(data.longitude !== undefined && { longitude: data.longitude }),
          ...(data.notes !== undefined && { notes: data.notes }),
        },
      });
    },
  };
});
// =====================================================================

interface ApiBody<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
}

interface Customer {
  id: string;
  customerCode: string;
  name: string;
}

interface Property {
  id: string;
  customerId: string;
  name: string;
  address: string;
}

let token: string;
let customerId: string;
let fixturePropertyId: string;

const unique = (prefix: string) =>
  `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

const auth = (req: request.Test) =>
  req.set("Authorization", `Bearer ${token}`);

const unwrapData = <T>(body: ApiBody<T> | T): T => {
  if (
    typeof body === "object" &&
    body !== null &&
    "data" in body &&
    body.data !== undefined
  ) {
    return body.data as T;
  }

  return body as T;
};

beforeAll(async () => {
  const loginResponse = await request(app)
    .post("/api/auth/login")
    .send({
      username: "admin",
      password: "rahasia",
    });

  expect(loginResponse.status).toBe(200);

  token = unwrapData<{ accessToken: string }>(
    loginResponse.body,
  ).accessToken;

  const customerResponse = await auth(
    request(app)
      .post("/api/customers")
      .send({
        customerCode: unique("PROP"),
        name: "Property Test Customer",
      }),
  );

  expect(customerResponse.status).toBe(201);

  customerId = unwrapData<Customer>(
    customerResponse.body,
  ).id;

  const propertyResponse = await auth(
    request(app)
      .post("/api/properties")
      .send({
        customerId,
        name: "Property API Fixture",
        address: "Jl. Test No. 123",
        city: "Medan",
        postalCode: "20111",
      }),
  );

  expect(propertyResponse.status).toBe(201);

  fixturePropertyId = unwrapData<Property>(
    propertyResponse.body,
  ).id;
});

describe("Property API", () => {
  it("returns 401 without authentication", async () => {
    const response = await request(app)
      .get("/api/properties");

    expect(response.status).toBe(401);
  });

  it("returns 401 with invalid token", async () => {
    const response = await request(app)
      .get("/api/properties")
      .set("Authorization", "Bearer invalid-token");

    expect(response.status).toBe(401);
  });

  it("lists properties", async () => {
    const response = await auth(
      request(app).get("/api/properties"),
    );

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);

    // FIX: Langsung pakai response.body biar object pagination nggak ilang
    const data = response.body;

    expect(Array.isArray(data.data)).toBe(true);
    expect(data.pagination).toHaveProperty("total");
    expect(data.pagination).toHaveProperty("totalPages");
  });

  it("filters properties by customer", async () => {
    const response = await auth(
      request(app)
        .get("/api/properties")
        .query({
          customerId,
        }),
    );

    expect(response.status).toBe(200);

    // FIX: Langsung pakai response.body
    const data = response.body;

    expect(
      data.data.every(
        (property: Property) => property.customerId === customerId,
      ),
    ).toBe(true);
  });

  it("supports search", async () => {
    const response = await auth(
      request(app)
        .get("/api/properties")
        .query({
          search: "Property API Fixture",
        }),
    );

    expect(response.status).toBe(200);

    // FIX: Langsung pakai response.body
    const data = response.body;

    expect(
      data.data.some(
        (property: Property) => property.id === fixturePropertyId,
      ),
    ).toBe(true);
  });

  it("gets a property by id", async () => {
    const response = await auth(
      request(app).get(
        `/api/properties/${fixturePropertyId}`,
      ),
    );

    expect(response.status).toBe(200);

    const property = unwrapData<Property>(response.body);

    expect(property.id).toBe(fixturePropertyId);
    expect(property.customerId).toBe(customerId);
  });

  it("creates a property", async () => {
    const response = await auth(
      request(app)
        .post("/api/properties")
        .send({
          customerId,
          name: "Created Property",
          address: "Jl. Created No. 10",
          city: "Medan",
        }),
    );

    expect(response.status).toBe(201);

    const property = unwrapData<Property>(response.body);

    expect(property.name).toBe("Created Property");
    expect(property.customerId).toBe(customerId);
  });

  it("validates property creation", async () => {
    const response = await auth(
      request(app)
        .post("/api/properties")
        .send({
          customerId,
          name: "",
        }),
    );

    expect(response.status).toBe(400);
  });

  it("updates a property", async () => {
    const newName = `Updated Property ${Date.now()}`;

    const response = await auth(
      request(app)
        .patch(`/api/properties/${fixturePropertyId}`)
        .send({
          name: newName,
        }),
    );

    expect(response.status).toBe(200);

    const property = unwrapData<Property>(response.body);

    expect(property.name).toBe(newName);
  });

  it("returns 404 for unknown property", async () => {
    const response = await auth(
      request(app).get(
        "/api/properties/00000000-0000-0000-0000-000000000000",
      ),
    );

    expect(response.status).toBe(404);
  });

  it("deletes a property", async () => {
    const createResponse = await auth(
      request(app)
        .post("/api/properties")
        .send({
          customerId,
          name: "Delete Property",
          address: "Jl. Delete No. 1",
        }),
    );

    expect(createResponse.status).toBe(201);

    const property = unwrapData<Property>(
      createResponse.body,
    );

    const deleteResponse = await auth(
      request(app).delete(
        `/api/properties/${property.id}`,
      ),
    );

    expect(deleteResponse.status).toBe(200);

    const getResponse = await auth(
      request(app).get(
        `/api/properties/${property.id}`,
      ),
    );

    expect(getResponse.status).toBe(404);
  });
});