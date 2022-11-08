import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createError } from "../middlewares/error";
import Users from "../models/users"
const JWT = '8hEnPGeoBqGUT6zksxt4G95gW+uMdzwe7EVaRnp0xRI=';



// Đăng ký
export const Registration = async(req, res) => {
        const {name, username, password: plainTextPassword, phone, CCCD, email,birthDay } = req.body;
        const exitsUser = await Users.findOne({ username }).exec();
        const exitsPhone = await Users.findOne({ phone }).exec();
        const exitsCCCD = await Users.findOne({ CCCD }).exec();
        const exitsEmail = await Users.findOne({ email }).exec();
        if (exitsEmail) {
            return res.status(200).json({
                error: "Email đã tồn tại"
            })
        }
        if (exitsUser) {
            return res.status(200).json({
                error: "Tên đăng nhập đã tồn tại"
            })
        }
        if (exitsPhone) {
            return res.status(200).json({
                error: "Số điện thoại đã tồn tại"
            })
        }
        if (exitsCCCD) {
            return res.status(200).json({
                error: "Số CCCD đã tồn tại"
            })
        }
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
                phone, 
                CCCD, 
                email,
                birthDay
            });
            res.status(200).json(response);
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
    const { username, password } = req.body;
    const user = await Users.findOne({ username }).lean()

    if (!user) {
        return res.json({ status: 'error', error: 'Tên người dùng hoặc mật khẩu không hợp lệ!' })
    }

    if (await bcrypt.compare(password, user.password)) {
        // the username, password combination is successful

        const token = jwt.sign({
                id: user._id,
                username: user.username
            },
            JWT
        )

        return res.json({ status: 'ok', data: token })
    }

    res.json({ status: 'error', error: 'Tên người dùng hoặc mật khẩu không hợp lệ!' })
};

// Đăng xuất
export const logout = async(req, res) => {
        return res
            .clearCookie("access_token")
            .status(200)
            .json({ error: "Successfully logged out 😏 🍀" });
    }
    // Đổi mật khẩu
export const usersChangePassword = async(req, res) => {
    const { token, newpassword: plainTextPassword } = req.body

    if (!plainTextPassword || typeof plainTextPassword !== 'string') {
        return res.json({ status: 'error', error: 'Mật khẩu không hợp lệ!' })
    }

    if (plainTextPassword.length < 5) {
        return res.json({
            status: 'error',
            error: 'Mật khẩu quá ngắn. Mật khẩu phải trên 6 ký tự!'
        })
    }
    try {
        const user = jwt.verify(token, JWT)

        const _id = user.id

        const password = await bcrypt.hash(plainTextPassword, 10)

        await userCustomer.updateOne({ _id }, {
            $set: { password }
        })
        res.json({ status: 'ok' })
    } catch (error) {
        console.log(error)
        res.json({ status: 'error', error: ';))' })
    }
}