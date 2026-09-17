import { env } from "./config/env.js";
import { prisma } from "./config/database.js";
import app from "./app.js";
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