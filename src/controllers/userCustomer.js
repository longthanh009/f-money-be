import sendToken from '../middlewares/jwtToken'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
const JWT_SECRET =
  'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk'
import userCustomer from '../models/userCustomer'

// Đăng ký
export const userCustomerRegistration = async (req, res) => {
  try {
    const {
      username,
      password: plainTextPassword,
      phone,
      SoCCCD,
      address,
      ImgCCCD,
    } = req.body

    if (!username || typeof username !== 'string') {
      return res.json({ status: 'error', error: 'Tên đăng nhập không hợp lệ!' })
    }

    if (!plainTextPassword || typeof plainTextPassword !== 'string') {
      return res.json({ status: 'error', error: 'Mật khẩu không hợp lệ!' })
    }

    if (plainTextPassword.length < 5) {
      return res.json({
        status: 'error',
        error: 'Mật khẩu quá ngắn. Mật khẩu phải trên 6 ký tự!',
      })
    }

    const myCloud = await cloudinary.v2.uploader.upload(ImgCCCD, {
      folder: 'ImgCCCD',
    })

    const password = await bcrypt.hash(plainTextPassword, 10);

    const user = await userCustomer.create({
      username,
      password,
      address,
      SoCCCD,
      phone,
      ImgCCCD: { public_id: myCloud.public_id, url: myCloud.secure_url },
    })
    console.log('Tài khoảng đăng ký thành công! : ', user)
    sendToken(user, 201, res)
  } catch (error) {
    if (error.code === 11000) {
			// duplicate key
			return res.json({ status: 'error', error: 'Tên tài khoản đã được sử dụng!' })
		}
		throw error
  }
  res.json({ status: 'ok' })
}
