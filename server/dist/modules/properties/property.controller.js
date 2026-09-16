import { createProperty, deleteProperty, getPropertyById, listProperties, updateProperty, } from "./property.service.js";
import { createPropertySchema, propertyListSchema, updatePropertySchema, } from "./property.validation.js";
export const listPropertiesController = async (req, res) => {
    if (!req.user) {
        res.status(401).json({
            success: false,
            message: "Authentication required",
        });
        return;
    }
    const parsed = propertyListSchema.safeParse(req.query);
    if (!parsed.success) {
        res.status(400).json({
            success: false,
            message: "Invalid query parameters",
            errors: parsed.error.flatten().fieldErrors,
        });
        return;
    }
    const result = await listProperties({
        businessId: req.user.businessId,
        ...parsed.data,
    });
    res.json({
        success: true,
        ...result,
    });
};
export const getPropertyController = async (req, res) => {
    if (!req.user) {
        res.status(401).json({
            success: false,
            message: "Authentication required",
        });
        return;
    }
    const { id: propertyId } = req.params;
    if (typeof propertyId !== "string" ||
        propertyId.length === 0) {
        res.status(400).json({
            success: false,
            message: "Property ID is required",
        });
        return;
    }
    const property = await getPropertyById(req.user.businessId, propertyId);
    if (!property) {
        res.status(404).json({
            success: false,
            message: "Property not found",
        });
        return;
    }
    res.json({
        success: true,
        data: property,
    });
};
export const createPropertyController = async (req, res) => {
    if (!req.user) {
        res.status(401).json({
            success: false,
            message: "Authentication required",
        });
        return;
    }
    const parsed = createPropertySchema.safeParse(req.body);
    if (!parsed.success) {
        res.status(400).json({
            success: false,
            message: "Invalid request body",
            errors: parsed.error.flatten().fieldErrors,
        });
        return;
    }
    const property = await createProperty(req.user.businessId, parsed.data);
    res.status(201).json({
        success: true,
        data: property,
    });
};
export const updatePropertyController = async (req, res) => {
    if (!req.user) {
        res.status(401).json({
            success: false,
            message: "Authentication required",
        });
        return;
    }
    const { id: propertyId } = req.params;
    if (typeof propertyId !== "string" ||
        propertyId.length === 0) {
        res.status(400).json({
            success: false,
            message: "Property ID is required",
        });
        return;
    }
    const parsed = updatePropertySchema.safeParse(req.body);
    if (!parsed.success) {
        res.status(400).json({
            success: false,
            message: "Invalid request body",
            errors: parsed.error.flatten().fieldErrors,
        });
        return;
    }
    const property = await updateProperty(req.user.businessId, propertyId, parsed.data);
    if (!property) {
        res.status(404).json({
            success: false,
            message: "Property not found",
        });
        return;
    }
    res.json({
        success: true,
        data: property,
    });
};
export const deletePropertyController = async (req, res) => {
    if (!req.user) {
        res.status(401).json({
            success: false,
            message: "Authentication required",
        });
        return;
    }
    const { id: propertyId } = req.params;
    if (typeof propertyId !== "string" ||
        propertyId.length === 0) {
        res.status(400).json({
            success: false,
            message: "Property ID is required",
        });
        return;
    }
    const property = await deleteProperty(req.user.businessId, propertyId);
    if (!property) {
        res.status(404).json({
            success: false,
            message: "Property not found",
        });
        return;
    }
    res.json({
        success: true,
        message: "Property deleted successfully",
    });
};
//# sourceMappingURL=property.controller.js.map