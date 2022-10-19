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

// Đăng nhập
export const userCustomerLogin = async (req, res) => {
	const { username, password } = req.body;
	const user = await userCustomer.findOne({ username }).lean()
  
	if (!user) {
		  return res.json({ status: 'error', error: 'Tên người dùng hoặc mật khẩu không hợp lệ!' })
	  }
  
	if (await bcrypt.compare(password, user.password)) {
		  // the username, password combination is successful
  
		  const token = jwt.sign(
			  {
				  id: user._id,
				  username: user.username
			  },
			  JWT_SECRET
		  )
  
		  return res.json({ status: 'ok', data: token })
	  }
  
	  res.json({ status: 'error', error: 'Tên người dùng hoặc mật khẩu không hợp lệ!' })
  }

// Đổi mật khẩu
export const userCustomerChangePassword = async (req, res) => {
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
		  const user = jwt.verify(token, JWT_SECRET)
  
		  const _id = user.id
  
		  const password = await bcrypt.hash(plainTextPassword, 10)
  
		  await userCustomer.updateOne(
			  { _id },
			  {
				  $set: { password }
			  }
		  )
		  res.json({ status: 'ok' })
	  } catch (error) {
		  console.log(error)
		  res.json({ status: 'error', error: ';))' })
	  }
}
