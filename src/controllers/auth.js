import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createError } from "../middlewares/error";
import Users from "../models/users"
const JWT = '8hEnPGeoBqGUT6zksxt4G95gW+uMdzwe7EVaRnp0xRI=';



// Đăng ký
export const Registration = async(req, res) => {
        const { name, username, password: plainTextPassword, SDT, CCCD, imgCCCD, Address } = req.body;
        if (!username || typeof username !== 'string') {
            return res.json({ status: 'error', error: 'Tên đăng nhập không hợp lệ!' })
        }

        if (!plainTextPassword || typeof plainTextPassword !== 'string') {
            return res.json({ status: 'error', error: 'Mật khẩu không hợp lệ!' })
        };

        if (plainTextPassword.length < 5) {
            return res.json({
                status: 'error',
                error: 'Mật khẩu quá ngắn. Mật khẩu phải trên 6 ký tự!'
            });
        }

        const password = await bcrypt.hash(plainTextPassword, 10);

        try {
            const response = await Users.create({
                name,
                username,
                password,
                SDT,
                CCCD,
                imgCCCD,
                Address
            })
            console.log('Tài khoảng đăng ký thành công! : ', response)
        } catch (error) {
            if (error.code === 11000) {
                // duplicate key
                return res.json({ status: 'error', error: 'Tên tài khoản đã được sử dụng!' })
            }
            throw error
        }
        res.json({ status: 'ok' })
    }
    // Đăng nhập
export const login = async(req, res, next) => {
    try {
        const user = await Users.findOne({ username: req.body.username });
        if (!user) return next(createError(404, "User not found!"));

        const isPasswordCorrect = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!isPasswordCorrect)
            return next(createError(400, "Wrong password or username!"));

        const token = jwt.sign({ id: user._id, role: user.role }, JWT);

        const { password, role, ...otherDetails } = user._doc;
        res
            .cookie("access_token", token, {
                httpOnly: true,
            })
            .status(200)
            .json({ details: {...otherDetails }, role });
    } catch (err) {
        next(err);
    }
};

// Đăng xuất
export const logout = async(req, res) => {
    return res
        .clearCookie("access_token")
        .status(200)
        .json({ message: "Successfully logged out 😏 🍀" });
}