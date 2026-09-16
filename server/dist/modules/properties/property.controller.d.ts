import type { Response } from "express";
import type { PropertyRequest } from "./property.types.js";
export declare const listPropertiesController: (req: PropertyRequest, res: Response) => Promise<void>;
export declare const getPropertyController: (req: PropertyRequest, res: Response) => Promise<void>;
export declare const createPropertyController: (req: PropertyRequest, res: Response) => Promise<void>;
export declare const updatePropertyController: (req: PropertyRequest, res: Response) => Promise<void>;
export declare const deletePropertyController: (req: PropertyRequest, res: Response) => Promise<void>;
//# sourceMappingURL=property.controller.d.ts.map