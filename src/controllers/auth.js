import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createAccessToken, createRefreshToken } from "../middlewares/jwtToken";
import Users from "../models/users"



// Đăng ký
export const Registration = async(req, res) => {
        try {
            const { name, username, password, SDT, CCCD, imgCCCD, Address } = req.body;

            // first registered user is an admin
            // const isFirstAccount = (await Users.countDocuments({})) === 0;
            // const role = isFirstAccount ? 'admin' : ('userLender': 'userCustomer');
            const user = await Users.findOne({ username })
            if (user) return res.status(400).json({ status: "Tên tài khoảng không hợp lệ!" })

            if (password.length < 6)
                return res.status(400).json({ status: "Mật khẩu quá ngắn. Phải có ít nhất 6 ký tự!" })

            // Password Encryption
            const passwordHash = await bcrypt.hash(password, 10)
            const newUser = new Users({
                    name,
                    username,
                    password: passwordHash,
                    SDT,
                    CCCD,
                    imgCCCD,
                    Address,
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
            return res.status(500).json({ status: err.message })
        }
    }
    // Đăng nhập
export const Login = async(req, res) => {
        try {
            const { username, password } = req.body;

            const user = await Users.findOne({ username })
            if (!user) return res.status(400).json({ status: "Tên tài khoảng không hợp lệ!" })

            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) return res.status(400).json({ status: "Mật khẩu quá ngắn. Phải có ít nhất 6 ký tự!" })

            // If login success , create access token and refresh token
            const accesstoken = createAccessToken({ id: user._id })
            const refreshtoken = createRefreshToken({ id: user._id })

            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/user/refresh_token',
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7d
            })

            res.json({ accesstoken })
        } catch (err) {
            return res.status(500).json({ status: err.message })
        }
    }
    // Đăng xuất
export const logout = async(req, res) => {
        try {
            res.clearCookie('refreshtoken', { path: '/user/refresh_token' })
            return res.json({ status: "Đăng xuất thành công!" })
        } catch (err) {
            return res.status(500).json({ status: err.message })
        }
    }
    // refreshToken
export const refreshToken = (req, res) => {
        try {
            const rf_token = req.cookies.refreshtoken;
            if (!rf_token) return res.status(400).json({ status: "Vui lòng đăng nhập hoặc đăng ký." })

            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                if (err) return res.status(400).json({ status: "Vui lòng đăng nhập hoặc đăng ký." })

                const accesstoken = createAccessToken({ id: user.id })

                res.json({ accesstoken })
            })

        } catch (err) {
            return res.status(500).json({ status: err.message })
        }

    }
    // history
export const history = async(req, res) => {
        try {
            const history = await Contract.find({ user_id: req.user.id })

            res.json(history)
        } catch (err) {
            return res.status(500).json({ status: err.message })
        }
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
        const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

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