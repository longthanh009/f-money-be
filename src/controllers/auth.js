import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Users from '../models/users'
import nodemailer from "nodemailer";

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
    const users = await Users.find().exec();
    const role = req.body.role
    const exitsUser = await Users.findOne({ username }).exec()
    const exitsPhone = await Users.findOne({ phone }).exec()
    const exitsEmail = await Users.findOne({ email }).exec()
    if (exitsEmail) {
      return res.status(400).json({
        message: "Email đã tồn tại"
      })
    }
    let code = "KH000" + users.length
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
    let status = false
    if (role == 0 || role == 2) status = true
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(req.body.password, salt)
    const newUser = await new Users({ ...req.body, password: hash, status, "code": code }).save()
    res.status(200).json({
      newUser: {
        code: code,
        name: newUser.name,
        password: newUser.password,
        username: newUser.username,
        phone: newUser.phone,
        email: newUser.email,
        CCCD: newUser.CCCD,
        imagePrev: newUser.imagePrev,
        imageBack: newUser.imageBack,
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
        code: user.code
      },
      "sontv", { expiresIn: "7d" }, { algorithm: 'HS256' }
    )
    const refreshToken = jwt.sign({ id: user._id, username: user.username, email: user.email, role: user.role,code: user.code }, "sontv", { expiresIn: "365d" }, { algorithm: 'HS256' }
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
        activate: user ? user.activate : null,
        code: user.code ? user.code : ""
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
var transporter = nodemailer.createTransport({ // config mail server
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'longktph14503@fpt.edu.vn',
    pass: 'long30092002'
  },
  tls: {
    rejectUnauthorized: false
  }
});
export const forgotPassword = async (req, res) => {
  const { username, email } = req.body;
  var content = '';
  var randomstring = Math.random().toString(36).slice(-8);
  try {
    const user = await Users.findOne({ "username": username }).exec();
    if (!user || user.email != email) {
      res.status(400).json({ error: 'Thông tin không chính xác !' })
      return;
    }
    content += `
    <div style="padding: 10px; background-color: #003375">
        <div style="padding: 10px; background-color: white;">
            <h4 style="color: #0085ff">Xin chào ${user.name}.</h4>
            <span style="color: black">Chúng tôi nhận được thông tin bạn cần cấp lại mật khẩu đăng nhập.Mật khẩu của bạn là <b> ${randomstring}</b>.Vui lòng đăng nhập và đổi lại mật khẩu</span>
            <br>
            <span> Trân trọng !</span>
        </div>
    </div>
`;
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(randomstring, salt);
    await Users.updateOne(
      { "_id": user._id },
      {
        $set: { "password": hash },
      },
    )
    var mainOptions = {
      from: 'longktph14503@fpt.edu.vn',
      to: email,
      subject: 'Cấp lại mật khẩu F_Money',
      text: '',//Thường thi mình không dùng cái này thay vào đó mình sử dụng html để dễ edit hơn
      html: content //Nội dung html mình đã tạo trên kia :))
    }
    transporter.sendMail(mainOptions, function (err, info) {
      if (err) {
        console.log(err);
      } else {
        console.log('Email sent: ' + info.response);
      }
    })
    res.json({ status: 'ok' })
  } catch (error) {
    res.json({ status: 'error', error: error })
  }
}