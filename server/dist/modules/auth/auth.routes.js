import { Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware.js";
import { changePasswordController, loginController, logoutController, meController, } from "./auth.controller.js";
const router = Router();
router.post("/login", loginController);
router.get("/me", authMiddleware, meController);
router.post("/change-password", authMiddleware, changePasswordController);
router.post("/logout", authMiddleware, logoutController);
export default router;
//# sourceMappingURL=auth.routes.js.map