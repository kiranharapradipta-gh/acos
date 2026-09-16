import type { Response } from "express";
import type { CustomerRequest } from "./customer.types.js";
export declare const listCustomersController: (req: CustomerRequest, res: Response) => Promise<void>;
export declare const getCustomerController: (req: CustomerRequest, res: Response) => Promise<void>;
export declare const createCustomerController: (req: CustomerRequest, res: Response) => Promise<void>;
export declare const updateCustomerController: (req: CustomerRequest, res: Response) => Promise<void>;
export declare const deleteCustomerController: (req: CustomerRequest, res: Response) => Promise<void>;
//# sourceMappingURL=customer.controller.d.ts.map