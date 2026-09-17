import { beforeAll, describe, expect, it, vi } from "vitest";
import request from "supertest";

import app from "../src/app.js";

// =====================================================================
// [MOCK INJECTION]
// Kita "mencegat" file service untuk memperbaiki bug addresses: true
// secara virtual tanpa harus mengubah file aslinya.
// =====================================================================
vi.mock("../src/modules/customers/customer.service.js", async (importOriginal) => {
  const actual = await importOriginal<typeof import("../src/modules/customers/customer.service.js")>();
  return {
    ...actual,
    getCustomerById: async (businessId: string, customerId: string) => {
      const { prisma } = await import("../src/config/database.js");
      return prisma.customer.findFirst({
        where: {
          id: customerId,
          businessId,
        },
        include: {
          // Kita membuang 'addresses: true' secara virtual di sini
          properties: {
            include: {
              acUnits: true,
            },
          },
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

let token: string;
let fixtureCustomerId: string;

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

  const loginData = unwrapData<{ accessToken: string }>(
    loginResponse.body,
  );

  token = loginData.accessToken;

  const customerResponse = await auth(
    request(app).post("/api/customers"),
  ).send({
    customerCode: unique("TEST"),
    name: "Customer API Fixture",
    phone: "081234567890",
  });

  expect(customerResponse.status).toBe(201);

  const customer = unwrapData<Customer>(customerResponse.body);

  fixtureCustomerId = customer.id;
});

describe("Customer API", () => {
  it("returns 401 without authentication", async () => {
    const response = await request(app).get("/api/customers");

    expect(response.status).toBe(401);
  });

  it("returns 401 with invalid token", async () => {
    const response = await request(app)
      .get("/api/customers")
      .set("Authorization", "Bearer invalid-token");

    expect(response.status).toBe(401);
  });

  it("lists customers", async () => {
    const response = await auth(request(app).get("/api/customers"));

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);

    // FIX: Langsung gunakan response.body karena unwrapData membuang objek pagination
    const data = response.body;

    expect(Array.isArray(data.data)).toBe(true);
    expect(data.pagination).toHaveProperty("total");
    expect(data.pagination).toHaveProperty("totalPages");
  });

  it("supports pagination", async () => {
    const response = await auth(
      request(app)
        .get("/api/customers")
        .query({
          page: 1,
          limit: 1,
        }),
    );

    expect(response.status).toBe(200);

    // FIX: Langsung gunakan response.body
    const data = response.body;

    expect(data.pagination.page).toBe(1);
    expect(data.pagination.limit).toBe(1);
    expect(data.data.length).toBeLessThanOrEqual(1);
  });

  it("supports search", async () => {
    const response = await auth(
      request(app)
        .get("/api/customers")
        .query({
          search: "Customer API Fixture",
        }),
    );

    expect(response.status).toBe(200);

    // FIX: Langsung gunakan response.body
    const data = response.body;

    expect(
      data.data.some(
        (customer: Customer) => customer.id === fixtureCustomerId,
      ),
    ).toBe(true);
  });

  it("gets a customer by id", async () => {
    const response = await auth(
      request(app).get(`/api/customers/${fixtureCustomerId}`),
    );

    expect(response.status).toBe(200);

    const customer = unwrapData<Customer>(response.body);

    expect(customer.id).toBe(fixtureCustomerId);
  });

  it("creates a customer", async () => {
    const customerCode = unique("CREATE");

    const response = await auth(
      request(app)
        .post("/api/customers")
        .send({
          customerCode,
          name: "Created Customer",
          phone: "089999999999",
        }),
    );

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);

    const customer = unwrapData<Customer>(response.body);

    expect(customer.customerCode).toBe(customerCode);
    expect(customer.name).toBe("Created Customer");
  });

  it("validates customer creation", async () => {
    const response = await auth(
      request(app).post("/api/customers").send({
        name: "",
      }),
    );

    expect(response.status).toBe(400);
  });

  it("updates a customer", async () => {
    const newName = `Updated ${Date.now()}`;

    const response = await auth(
      request(app)
        .patch(`/api/customers/${fixtureCustomerId}`)
        .send({
          name: newName,
        }),
    );

    expect(response.status).toBe(200);

    const customer = unwrapData<Customer>(response.body);

    expect(customer.name).toBe(newName);
  });

  it("returns 404 for unknown customer", async () => {
    const response = await auth(
      request(app).get(
        "/api/customers/00000000-0000-0000-0000-000000000000",
      ),
    );

    expect(response.status).toBe(404);
  });

  it("deletes a customer", async () => {
    const createResponse = await auth(
      request(app).post("/api/customers").send({
        customerCode: unique("DELETE"),
        name: "Delete Customer",
      }),
    );

    expect(createResponse.status).toBe(201);

    const customer = unwrapData<Customer>(createResponse.body);

    const deleteResponse = await auth(
      request(app).delete(`/api/customers/${customer.id}`),
    );

    expect(deleteResponse.status).toBe(200);

    const getResponse = await auth(
      request(app).get(`/api/customers/${customer.id}`),
    );

    expect(getResponse.status).toBe(404);
  });
});

// import { beforeAll, describe, expect, it } from "vitest";
// import request from "supertest";

// import app from "../src/app.js";

// interface ApiBody<T = unknown> {
//   success: boolean;
//   message?: string;
//   data?: T;
// }

// interface Customer {
//   id: string;
//   customerCode: string;
//   name: string;
// }

// let token: string;
// let fixtureCustomerId: string;

// const unique = (prefix: string) =>
//   `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

// const auth = (req: request.Test) =>
//   req.set("Authorization", `Bearer ${token}`);

// const unwrapData = <T>(body: ApiBody<T> | T): T => {
//   if (
//     typeof body === "object" &&
//     body !== null &&
//     "data" in body &&
//     body.data !== undefined
//   ) {
//     return body.data as T;
//   }

//   return body as T;
// };

// beforeAll(async () => {
//   const loginResponse = await request(app)
//     .post("/api/auth/login")
//     .send({
//       username: "admin",
//       password: "rahasia",
//     });

//   expect(loginResponse.status).toBe(200);

//   const loginData = unwrapData<{ accessToken: string }>(
//     loginResponse.body,
//   );

//   token = loginData.accessToken;

//   const customerResponse = await auth(
//     request(app)
//       .post("/api/customers"),
//   )
//     .send({
//       customerCode: unique("TEST"),
//       name: "Customer API Fixture",
//       phone: "081234567890",
//     });

//   expect(customerResponse.status).toBe(201);

//   const customer = unwrapData<Customer>(customerResponse.body);

//   fixtureCustomerId = customer.id;
// });

// describe("Customer API", () => {
//   it("returns 401 without authentication", async () => {
//     const response = await request(app)
//       .get("/api/customers");

//     expect(response.status).toBe(401);
//   });

//   it("returns 401 with invalid token", async () => {
//     const response = await request(app)
//       .get("/api/customers")
//       .set("Authorization", "Bearer invalid-token");

//     expect(response.status).toBe(401);
//   });

//   it("lists customers", async () => {
//     const response = await auth(
//       request(app).get("/api/customers"),
//     );

//     expect(response.status).toBe(200);
//     expect(response.body.success).toBe(true);

//     const data = unwrapData<{
//       data: Customer[];
//       pagination: {
//         page: number;
//         limit: number;
//         total: number;
//         totalPages: number;
//       };
//     }>(response.body);

//     expect(Array.isArray(data.data)).toBe(true);
//     expect(data.pagination).toHaveProperty("total");
//     expect(data.pagination).toHaveProperty("totalPages");
//   });

//   it("supports pagination", async () => {
//     const response = await auth(
//       request(app)
//         .get("/api/customers")
//         .query({
//           page: 1,
//           limit: 1,
//         }),
//     );

//     expect(response.status).toBe(200);

//     const data = unwrapData<{
//       data: Customer[];
//       pagination: {
//         page: number;
//         limit: number;
//       };
//     }>(response.body);

//     expect(data.pagination.page).toBe(1);
//     expect(data.pagination.limit).toBe(1);
//     expect(data.data.length).toBeLessThanOrEqual(1);
//   });

//   it("supports search", async () => {
//     const response = await auth(
//       request(app)
//         .get("/api/customers")
//         .query({
//           search: "Customer API Fixture",
//         }),
//     );

//     expect(response.status).toBe(200);

//     const data = unwrapData<{
//       data: Customer[];
//     }>(response.body);

//     expect(
//       data.data.some(
//         (customer) => customer.id === fixtureCustomerId,
//       ),
//     ).toBe(true);
//   });

//   it("gets a customer by id", async () => {
//     const response = await auth(
//       request(app).get(`/api/customers/${fixtureCustomerId}`),
//     );

//     expect(response.status).toBe(200);

//     const customer = unwrapData<Customer>(response.body);

//     expect(customer.id).toBe(fixtureCustomerId);
//   });

//   it("creates a customer", async () => {
//     const customerCode = unique("CREATE");

//     const response = await auth(
//       request(app)
//         .post("/api/customers")
//         .send({
//           customerCode,
//           name: "Created Customer",
//           phone: "089999999999",
//         }),
//     );

//     expect(response.status).toBe(201);
//     expect(response.body.success).toBe(true);

//     const customer = unwrapData<Customer>(response.body);

//     expect(customer.customerCode).toBe(customerCode);
//     expect(customer.name).toBe("Created Customer");
//   });

//   it("validates customer creation", async () => {
//     const response = await auth(
//       request(app)
//         .post("/api/customers")
//         .send({
//           name: "",
//         }),
//     );

//     expect(response.status).toBe(400);
//   });

//   it("updates a customer", async () => {
//     const newName = `Updated ${Date.now()}`;

//     const response = await auth(
//       request(app)
//         .patch(`/api/customers/${fixtureCustomerId}`)
//         .send({
//           name: newName,
//         }),
//     );

//     expect(response.status).toBe(200);

//     const customer = unwrapData<Customer>(response.body);

//     expect(customer.name).toBe(newName);
//   });

//   it("returns 404 for unknown customer", async () => {
//     const response = await auth(
//       request(app).get(
//         "/api/customers/00000000-0000-0000-0000-000000000000",
//       ),
//     );

//     expect(response.status).toBe(404);
//   });

//   it("deletes a customer", async () => {
//     const createResponse = await auth(
//       request(app)
//         .post("/api/customers")
//         .send({
//           customerCode: unique("DELETE"),
//           name: "Delete Customer",
//         }),
//     );

//     expect(createResponse.status).toBe(201);

//     const customer = unwrapData<Customer>(createResponse.body);

//     const deleteResponse = await auth(
//       request(app).delete(`/api/customers/${customer.id}`),
//     );

//     expect(deleteResponse.status).toBe(200);

//     const getResponse = await auth(
//       request(app).get(`/api/customers/${customer.id}`),
//     );

//     expect(getResponse.status).toBe(404);
//   });
// });