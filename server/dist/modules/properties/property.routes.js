import { Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware.js";
import { requirePermission } from "../../middleware/permission.middleware.js";
import { createPropertyController, deletePropertyController, getPropertyController, listPropertiesController, updatePropertyController, } from "./property.controller.js";
const router = Router();
router.use(authMiddleware);
router.get("/", requirePermission("property.read"), listPropertiesController);
router.get("/:id", requirePermission("property.read"), getPropertyController);
router.post("/", requirePermission("property.create"), createPropertyController);
router.patch("/:id", requirePermission("property.update"), updatePropertyController);
router.delete("/:id", requirePermission("property.delete"), deletePropertyController);
export default router;
//# sourceMappingURL=property.routes.js.map