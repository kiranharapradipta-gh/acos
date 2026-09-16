import type { AuthenticatedRequest } from "../modules/auth/auth.types.js";

export const getBusinessId = (req: AuthenticatedRequest): string => {
  if (!req.user) {
    throw new Error("Authentication required");
  }

  return req.user.businessId;
};