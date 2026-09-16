export interface AuthTokenPayload {
    userId: string;
    businessId: string;
    roleId: string;
}
export declare const signAccessToken: (payload: AuthTokenPayload) => string;
export declare const verifyAccessToken: (token: string) => AuthTokenPayload;
//# sourceMappingURL=jwt.d.ts.map