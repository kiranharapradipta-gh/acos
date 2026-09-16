import jwt from "jsonwebtoken";
import type { StringValue } from "ms";

import { env } from "../config/env.js";

export interface AuthTokenPayload {
  userId: string;
  businessId: string;
  roleId: string;
}

export const signAccessToken = (payload: AuthTokenPayload) => {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN as StringValue,
  });
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, env.JWT_SECRET) as AuthTokenPayload;
};