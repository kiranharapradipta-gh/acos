export const errorMiddleware = (error, _req, res, _next) => {
    console.error(error);
    res.status(500).json({
        success: false,
        message: "Internal server error",
    });
};
//# sourceMappingURL=error.middleware.js.map