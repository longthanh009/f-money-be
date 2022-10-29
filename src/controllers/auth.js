import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createAccessToken, createRefreshToken } from "../middlewares/jwtToken";
import Users from "../models/users"



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
    //updateUsers
export const updateUsers = async(req, res) => {
    try {
        const updatedUser = await Users.findByIdAndUpdate(
            req.params.id, {
                $set: req.body,
            }, { new: true }
        );
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json(err);
    }
}

// get/:id
export const getUser = async(req, res) => {
        try {
            const user = await Users.findById(req.params.id);
            const { password, ...others } = user._doc;
            res.status(200).json(others);
        } catch (err) {
            res.status(500).json(err);
        }
    }
    // deleteUsers
export const deleteUsers = async(req, res) => {
        try {
            await Users.findByIdAndDelete(req.params.id);
            res.status(200).json("Người dùng đã bị xóa ...");
        } catch (err) {
            res.status(500).json(err);
        }
    }
    // Get - phân trang
const PAGE_SIZE = 5 //có 5 phần tử trong page
export const getUsers = async(req, res, next) => {
        var page = req.query.page;

        if (page) {
            //get page
            page = parseInt(page)
            if (page < 0) {
                page = 1
            }
            var soLuongBoQua = (page - 1) * PAGE_SIZE;


            await Users.find().skip(soLuongBoQua).limit(PAGE_SIZE)
                .then(users => {
                    res.status(200).json(users);
                }).catch(err => {
                    res.status(500).json("Lỗi server!");
                })
        } else {
            try {
                const users = await Users.find();
                res.status(200).json(users);
            } catch (err) {
                next(err);
            }
        }
    }
    // Get - Search
export const searchUsers = async(req, res, next) => {
    let data = await Users.find({
        "$or": [
            { name: { $regex: req.params.key } }
        ]
    })
    res.send(data);
}