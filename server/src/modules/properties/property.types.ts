import type { Request } from "express";

export interface PropertyRequest extends Request {
  user?: {
    userId: string;
    businessId: string;
    roleId: string;
  };
}