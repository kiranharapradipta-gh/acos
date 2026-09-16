import { Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware.js";
import { requirePermission } from "../../middleware/permission.middleware.js";
import { createCustomerController, deleteCustomerController, getCustomerController, listCustomersController, updateCustomerController, } from "./customer.controller.js";
const router = Router();
router.use(authMiddleware);
router.get("/", requirePermission("customer.read"), listCustomersController);
router.get("/:id", requirePermission("customer.read"), getCustomerController);
router.post("/", requirePermission("customer.create"), createCustomerController);
router.patch("/:id", requirePermission("customer.update"), updateCustomerController);
router.delete("/:id", requirePermission("customer.delete"), deleteCustomerController);
export default router;
//# sourceMappingURL=customer.routes.js.map