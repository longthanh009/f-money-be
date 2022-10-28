import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createAccessToken, createRefreshToken } from "../middlewares/jwtToken";
import Users from "../models/users"


// Đăng ký
export const Registration = async(req, res) => {
    try {
        const { username, password } = req.body;

        // first registered user is an admin
        // const isFirstAccount = (await Users.countDocuments({})) === 0;
        // const role = isFirstAccount ? 'admin' : ('userLender': 'userCustomer');
        const user = await Users.findOne({ username })
        if (username) return res.status(400).json({ msg: "Tên tài khoảng không hợp lệ!" })

        if (password.length < 6)
            return res.status(400).json({ msg: "Mật khẩu quá ngắn. Phải có ít nhất 6 ký tự!" })

        // Password Encryption
        const passwordHash = await bcrypt.hash(password, 10)
        const newUser = new Users({
                username,
                password: passwordHash
            })
            // Save mongodb
        await newUser.save()

        // Then create jsonwebtoken to authentication
        const accesstoken = createAccessToken({ id: newUser._id })
        const refreshtoken = createRefreshToken({ id: newUser._id })
        res.cookie('refreshtoken', refreshtoken, {
            httpOnly: true,
            path: '/user/refresh_token',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7d
        })
        res.json({ accesstoken })
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}
export const adminLogin = async(req, res) => {
    const { username, password } = req.body;
    const user = await Admin.findOne({ username }).lean()

    if (!user) {
        return res.json({ status: 'error', error: 'Tên đăng nhập hoặc tài khoản không hợp lệ!' })
    }

    if (await bcrypt.compare(password, user.password)) {
        // the username, password combination is successful

        const token = jwt.sign({
                id: user._id,
                name: user.username
            },
            JWT_SECRET
        )

        return res.json({ status: 'ok', data: token })
    }

    res.json({ status: 'error', error: 'Tên đăng nhập hoặc tài khoản không hợp lệ!' })
}