interface LoginInput {
    username: string;
    password: string;
}
export declare const login: ({ username, password }: LoginInput) => Promise<{
    accessToken: string;
    user: {
        id: string;
        name: string;
        username: string;
        email: string | null;
        status: "ACTIVE";
        businessId: string;
        businessName: string;
        roleId: string;
        roleName: string;
    };
}>;
export declare const getMe: (userId: string) => Promise<{
    id: string;
    name: string;
    username: string;
    email: string | null;
    status: "ACTIVE";
    businessId: string;
    businessName: string;
    roleId: string;
    roleName: string;
}>;
export declare const changePassword: (userId: string, currentPassword: string, newPassword: string) => Promise<void>;
export {};
//# sourceMappingURL=auth.service.d.ts.map