import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "./config/env.js";
import { prisma } from "./config/database.js";
const app = express();
app.use(helmet());
app.use(cors({
    origin: env.CORS_ORIGIN,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.get("/health", (_req, res) => {
    res.json({
        success: true,
        message: "AC Service Management API is running",
    });
});
app.get("/health/db", async (_req, res) => {
    try {
        await prisma.$queryRaw `SELECT 1`;
        res.json({
            success: true,
            message: "Database connection is healthy",
        });
    }
    catch (error) {
        console.error("Database health check failed:", error);
        res.status(503).json({
            success: false,
            message: "Database connection failed",
        });
    }
});
const server = app.listen(env.PORT, () => {
    console.log(`AC Service Management API running on http://localhost:${env.PORT}`);
});
const shutdown = async (signal) => {
    console.log(`${signal} received. Shutting down...`);
    server.close(async () => {
        await prisma.$disconnect();
        console.log("Server stopped.");
        process.exit(0);
    });
};
process.on("SIGINT", () => void shutdown("SIGINT"));
process.on("SIGTERM", () => void shutdown("SIGTERM"));
//# sourceMappingURL=index.js.map