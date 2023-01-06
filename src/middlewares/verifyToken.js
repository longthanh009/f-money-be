import jwt from "jsonwebtoken";
import moment from 'moment';
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