import { prisma } from "../config/database.js";
export const requirePermission = (permissionCode) => {
    return async (req, res, next) => {
        if (!req.user) {
            res.status(401).json({
                success: false,
                message: "Authentication required",
            });
            return;
        }
        try {
            const rolePermission = await prisma.rolePermission.findFirst({
                where: {
                    roleId: req.user.roleId,
                    permission: {
                        code: permissionCode,
                    },
                },
            });
            if (!rolePermission) {
                res.status(403).json({
                    success: false,
                    message: "You do not have permission to perform this action",
                });
                return;
            }
            next();
        }
        catch (error) {
            next(error);
        }
    };
};
//# sourceMappingURL=permission.middleware.js.map