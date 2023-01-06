import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Users from '../models/users'

// Đăng ký
export const Registration = async (req, res, next) => {
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

    const newUser = await new Users({ ...req.body, password: hash, }).save()
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
  const user = await Users.findOne({ username }).exec();
  if (!user) {
    return res.json({ status: 'error', error: 'Tên người dùng hoặc mật khẩu không hợp lệ!' })
  }
  if (user) {
    if (user.status == false) {
      return res.json({ status: 'error', error: 'Tài khoản của bạn đã hết hạn hoặc đang bị khoá!' })
    }
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      "sontv", { expiresIn: "7d" }, { algorithm: 'HS256' }
    )
    const refreshToken = jwt.sign({id: user._id,username: user.username,email: user.email, role: user.role,},"sontv", { expiresIn: "365d" }, { algorithm: 'HS256' }
    )
    return res.json({
      status: 'Login Success', data: {
        id: user._id,
        username: user.username,
        email: user.email,
        name: user.name,
        token,
        refreshToken,
        role: user.role,
        address: user.address,
        phone: user.phone,
        activate :user ? user.activate :null
      }
    })
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
    const user = jwt.verify(token, "sontv")
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
    res.json({ status: 'error', error: ';))' })
  }
}
