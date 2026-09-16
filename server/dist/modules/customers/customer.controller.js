import { createCustomerSchema, customerListSchema, updateCustomerSchema, } from "./customer.validation.js";
import { createCustomer, deleteCustomer, getCustomerById, listCustomers, updateCustomer, } from "./customer.service.js";
export const listCustomersController = async (req, res) => {
    if (!req.user) {
        res.status(401).json({
            success: false,
            message: "Authentication required",
        });
        return;
    }
    const parsed = customerListSchema.safeParse(req.query);
    if (!parsed.success) {
        res.status(400).json({
            success: false,
            message: "Invalid query parameters",
            errors: parsed.error.flatten().fieldErrors,
        });
        return;
    }
    try {
        const result = await listCustomers({
            businessId: req.user.businessId,
            ...parsed.data,
        });
        res.json({
            success: true,
            ...result,
        });
    }
    catch (error) {
        throw error;
    }
};
export const getCustomerController = async (req, res) => {
    if (!req.user) {
        res.status(401).json({
            success: false,
            message: "Authentication required",
        });
        return;
    }
    const { id: customerId } = req.params;
    if (typeof customerId !== "string" || customerId.length === 0) {
        res.status(400).json({
            success: false,
            message: "Customer ID is required",
        });
        return;
    }
    const customer = await getCustomerById(req.user.businessId, customerId);
    if (!customer) {
        res.status(404).json({
            success: false,
            message: "Customer not found",
        });
        return;
    }
    res.json({
        success: true,
        data: customer,
    });
};
export const createCustomerController = async (req, res) => {
    if (!req.user) {
        res.status(401).json({
            success: false,
            message: "Authentication required",
        });
        return;
    }
    const parsed = createCustomerSchema.safeParse(req.body);
    if (!parsed.success) {
        res.status(400).json({
            success: false,
            message: "Invalid request body",
            errors: parsed.error.flatten().fieldErrors,
        });
        return;
    }
    const customer = await createCustomer(req.user.businessId, parsed.data);
    res.status(201).json({
        success: true,
        data: customer,
    });
};
export const updateCustomerController = async (req, res) => {
    if (!req.user) {
        res.status(401).json({
            success: false,
            message: "Authentication required",
        });
        return;
    }
    const { id: customerId } = req.params;
    if (typeof customerId !== "string" || customerId.length === 0) {
        res.status(400).json({
            success: false,
            message: "Customer ID is required",
        });
        return;
    }
    const parsed = updateCustomerSchema.safeParse(req.body);
    if (!parsed.success) {
        res.status(400).json({
            success: false,
            message: "Invalid request body",
            errors: parsed.error.flatten().fieldErrors,
        });
        return;
    }
    const customer = await updateCustomer(req.user.businessId, customerId, parsed.data);
    if (!customer) {
        res.status(404).json({
            success: false,
            message: "Customer not found",
        });
        return;
    }
    res.json({
        success: true,
        data: customer,
    });
};
export const deleteCustomerController = async (req, res) => {
    if (!req.user) {
        res.status(401).json({
            success: false,
            message: "Authentication required",
        });
        return;
    }
    const { id: customerId } = req.params;
    if (typeof customerId !== "string" || customerId.length === 0) {
        res.status(400).json({
            success: false,
            message: "Customer ID is required",
        });
        return;
    }
    const customer = await deleteCustomer(req.user.businessId, customerId);
    if (!customer) {
        res.status(404).json({
            success: false,
            message: "Customer not found",
        });
        return;
    }
    res.json({
        success: true,
        message: "Customer deleted successfully",
    });
};
//# sourceMappingURL=customer.controller.js.map