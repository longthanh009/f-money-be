import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user";
const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk'


// Đăng ký
export const userRegistration = async (req, res) => {
    const { username, password: plainTextPassword,email, phone, CCCD, address} = req.body;

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
		const response = await User.create({
			username,
			password,
            phone,
            CCCD,
            address
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
export const userLogin = async (req, res) => {
	const { name, password } = req.body;
	const user = await User.findOne({ name }).lean()
  
	if (!user) {
		  return res.json({ status: 'error', error: 'Tên người dùng hoặc mật khẩu không hợp lệ!' })
	  }
  
	if (await bcrypt.compare(password, user.password)) {
		  // the username, password combination is successful
  
		  const token = jwt.sign(
			  {
				  id: user._id,
				  name: user.name
			  },
			  JWT_SECRET
		  )
  
		  return res.json({ status: 'ok', data: token })
	  }
  
	  res.json({ status: 'error', error: 'Tên người dùng hoặc mật khẩu không hợp lệ!' })
  }

  // Đổi mật khẩu
export const changePassword = async (req, res) => {
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
  
		  await User.updateOne(
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

export const signOut = async (req, res) => {
	if (req.headers && req.headers.authorization) {
		const token = req.headers.authorization.split(' ')[1];
		if (!token) {
		  return res
			.status(401)
			.json({ success: false, message: 'Authorization fail!' });
		}
		const tokens = req.user.tokens;

    const newTokens = tokens.filter(t => t.token !== token);

    await User.findByIdAndUpdate(req.user._id, { tokens: newTokens });
    res.json({ success: true, message: 'Đăng xuất thành công!' });
  }
}