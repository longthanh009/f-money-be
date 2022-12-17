import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { createError } from '../middlewares/error'
import Users from '../models/users'
const JWT = '8hEnPGeoBqGUT6zksxt4G95gW+uMdzwe7EVaRnp0xRI='

// Đăng ký
export const Registration = async (req, res , next) => {
  const { name, username, password, phone, email } = req.body
    // try {
    //   const exitsUser = await Users.findOne({ username }).exec();
    //   const exitsPhone = await Users.findOne({ phone }).exec();
    //   const exitsEmail = await Users.findOne({ email }).exec();
    //   if (exitsEmail) {
    //       return res.status(400).json({
    //           message: "Email đã tồn tại"
    //       })
    //   }
    //   if (exitsUser) {
    //       return res.status(400).json({
    //           message: "Tên đăng nhập đã tồn tại"
    //       })
    //   }
    //   if (exitsPhone) {
    //       return res.status(400).json({
    //           message: "Số điện thoại đã tồn tại"
    //       })
    //   }
    //   if (plainTextPassword.length < 5) {
    //     return res.json({
    //       status: "error",
    //       error: "Mật khẩu quá ngắn. Mật khẩu phải trên 6 ký tự!",
    //     });
    //   }

    //   const password = await bcrypt.hash(plainTextPassword, 10);

    //   const user = await new Users(req.body).save();
    //   res.status(200).json({
    //     user: {
    //       name: user.name,
    //       password: user.password,
    //       username: user.username,
    //       phone: user.phone,
    //       email: user.email,
    //     },
    //   });
    // } catch (error) {
    //   if (error.code === 11000) {
    //     // duplicate key
    //     return res.json({
    //       status: "error",
    //       error: "Tên tài khoản đã được sử dụng!",
    //     });
    //   }
    // }
    // res.json({ status: "ok" });
  try {
    const exitsUser = await Users.findOne({ username }).exec()
    const exitsPhone = await Users.findOne({ phone }).exec()
    const exitsEmail = await Users.findOne({ email }).exec()

    if (exitsEmail) {
        return res.status(400).json({
            message: "Email đã tồn tại"
        })
    }
    if (exitsUser) {
        return res.status(400).json({
            message: "Tên đăng nhập đã tồn tại"
        })
    }
    if (exitsPhone) {
        return res.status(400).json({
            message: "Số điện thoại đã tồn tại"
        })
    }
    if (password.length < 5) {
      return res.json({
        status: "error",
        error: "Mật khẩu quá ngắn. Mật khẩu phải trên 6 ký tự!",
      });
    }
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(req.body.password, salt)

    const newUser = await new Users({...req.body,password: hash,}).save()
    res.status(200).json({
      newUser: {
        name: newUser.name,
        password: newUser.password,
        username: newUser.username,
        phone: newUser.phone,
        email: newUser.email,
      },
    })
  } catch (error) {
    return res.status(400).json({
      status: "error",
      error: "Đăng ký không thành công",
    });
  }
}
// Đăng nhập
export const login = async (req, res) => {
  const { username, password } = req.body
	const user = await Users.findOne({ username }).lean()

	if (!user) {
		return res.json({ status: 'error', error: 'Tên người dùng hoặc mật khẩu không hợp lệ!' })
	}

	if (await bcrypt.compare(password, user.password)) {
		// the username, password combination is successful

		const token = jwt.sign(
			{
				id: user._id,
				username: user.username,
        role : user.role,
        activate : user.activate.end_date
			},
			JWT
		)

		return res.json({ status: 'ok', data: token })
	}

	res.json({ status: 'error', error: 'Tên người dùng hoặc mật khẩu không hợp lệ!' })
}

// Đăng xuất
export const logout = async (req, res) => {
  return res
    .clearCookie('access_token')
    .status(200)
    .json({ error: 'Successfully logged out 😏 🍀' })
}
// Đổi mật khẩu
export const usersChangePassword = async (req, res) => {
  const { token, newpassword: plainTextPassword } = req.body

  if (!plainTextPassword || typeof plainTextPassword !== 'string') {
    return res.json({ status: 'error', error: 'Mật khẩu không hợp lệ!' })
  }

  if (plainTextPassword.length < 5) {
    return res.json({
      status: 'error',
      error: 'Mật khẩu quá ngắn. Mật khẩu phải trên 6 ký tự!',
    })
  }
  try {
    const user = jwt.verify(token, JWT)

    const _id = user.id

    const password = await bcrypt.plainTextPassword

    await userCustomer.updateOne(
      { _id },
      {
        $set: { password },
      },
    )
    res.json({ status: 'ok' })
  } catch (error) {
    console.log(error)
    res.json({ status: 'error', error: ';))' })
  }
}
