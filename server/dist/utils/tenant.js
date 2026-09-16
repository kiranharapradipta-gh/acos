export const getBusinessId = (req) => {
    if (!req.user) {
        throw new Error("Authentication required");
    }
    return req.user.businessId;
};
//# sourceMappingURL=tenant.js.map