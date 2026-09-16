import { prisma } from "../../config/database.js";
import { comparePassword, hashPassword } from "../../utils/password.js";
import { signAccessToken } from "../../utils/jwt.js";
export const login = async ({ username, password }) => {
    const user = await prisma.user.findFirst({
        where: {
            username,
        },
        include: {
            business: true,
            role: true,
        },
    });
    if (!user) {
        throw new Error("Invalid username or password");
    }
    if (user.status !== "ACTIVE") {
        throw new Error("User account is not active");
    }
    const passwordValid = await comparePassword(password, user.passwordHash);
    if (!passwordValid) {
        throw new Error("Invalid username or password");
    }
    const accessToken = signAccessToken({
        userId: user.id,
        businessId: user.businessId,
        roleId: user.roleId,
    });
    return {
        accessToken,
        user: {
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            status: user.status,
            businessId: user.businessId,
            businessName: user.business.name,
            roleId: user.roleId,
            roleName: user.role.name,
        },
    };
};
export const getMe = async (userId) => {
    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
        include: {
            business: true,
            role: true,
        },
    });
    if (!user || user.status !== "ACTIVE") {
        throw new Error("User not found");
    }
    return {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        status: user.status,
        businessId: user.businessId,
        businessName: user.business.name,
        roleId: user.roleId,
        roleName: user.role.name,
    };
};
export const changePassword = async (userId, currentPassword, newPassword) => {
    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
    });
    if (!user) {
        throw new Error("User not found");
    }
    const valid = await comparePassword(currentPassword, user.passwordHash);
    if (!valid) {
        throw new Error("Current password is incorrect");
    }
    const passwordHash = await hashPassword(newPassword);
    await prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            passwordHash,
        },
    });
};
//# sourceMappingURL=auth.service.js.map