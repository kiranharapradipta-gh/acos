import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

import { env } from "./config/env.js";
import authRoutes from "./modules/auth/auth.routes.js";
import customerRoutes from "./modules/customers/customer.routes.js";
import propertyRoutes from "./modules/properties/property.routes.js";
import { errorMiddleware } from "./middleware/error.middleware.js";

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: env.CORS_ORIGIN,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/health", (_req, res) => {
  res.json({
    success: true,
    message: "AC Service Management API is running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/properties", propertyRoutes);

app.use(errorMiddleware);

export default app;