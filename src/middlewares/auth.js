export const isAdmin = (req, res, next) => {
    if (req.user.role !== 2) {
        return res.status(401).json({
            message: "Không có quyền truy cập dữ liệu ADMIN.",
        });
    }
    next();
};

export const isLender = (req, res, next) => {
    if (req.user.role !== 1) {
        return res.status(401).json({
            message: "Không có quyền truy cập dữ liệu Lender.",
        });
    }
    next();
};

export const isAdminOrLender = (req, res, next) => {
    if (req.user.role == 0) {
        return res.status(401).json({
            message: "Không có quyền truy cập dữ liệu Lender và Admin",
        });
    }
    next();
};