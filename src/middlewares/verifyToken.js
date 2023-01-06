import jwt from "jsonwebtoken";
import moment from 'moment';
const JWT = '8hEnPGeoBqGUT6zksxt4G95gW+uMdzwe7EVaRnp0xRI=';
import { createError } from "../utils/error.js";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return next(createError(401, "You are not authenticated!"));
    }
    jwt.verify(token, JWT, (err, user) => {
        if (err) return next(createError(403, "Token is not valid!"));
        req.user = user;
        next();
    });
};

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            return next(createError(403, "You are not authorized!"));
        }
    });
};

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.user.role) {
            next();
        } else {
            return next(createError(403, "You are not authorized!"));
        }
    });
};

// create json web token
const maxAge = 3 * 24 * 60 * 60;

export const createToken = (id) => {
    return jwt.sign({ id }, 'net ninja secret', {
        expiresIn: maxAge
    });
};
export const jwtVerifyToken = async (req, res, next) => {
    const token = req.headers['authorization'] ? req.headers['authorization'].split(" ") : null
    if (!token) {
        return res.status(401).json({
            message: 'Vui lòng đăng nhập.'
        })
    }
    else {
        try {
            jwt.verify(token[0], 'sontv', { algorithm: 'HS256' }, (err, decoded) => {
                if (err) {
                    return res.status(401).json(err)
                }
                req.user = decoded;
                if (moment().format('X') > req.user.exp) {
                    return res.status(401).json({
                        message: "Vui lòng đăng nhập lại"
                    })
                }

                next()
            })
        } catch (error) {
            return res.status(400).json({
                message: error.message
            })
        }
    }
}