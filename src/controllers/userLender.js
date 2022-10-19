import bcrypt from "bcryptjs";
import jwt from"jsonwebtoken";
const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk'
import userLender from "../models/userLender"


// Đăng ký
export const userLenderRegistration = async (req, res) => {
  const { username, password: plainTextPassword, SDT, Address} = req.body;

if (!username || typeof username !== 'string') {
  return res.json({ status: 'error', error: 'Tên tài khoảng không hợp lệ!' })
}

if (!plainTextPassword || typeof plainTextPassword !== 'string') {
  return res.json({ status: 'error', error: 'Mật khẩu không hợp lệ!' })
};

if (plainTextPassword.length < 5) {
  return res.json({
    status: 'error',
    error: 'Mật khẩu quá ngắn. Phải có ít nhất 6 ký tự!'
  });
}

const password = await bcrypt.hash(plainTextPassword, 10);

try {
  const response = await userLender.create({
    username,
    password,
    SDT,
    Address
  })
  console.log('Người dùng được tạo thành công: ', response)
} catch (error) {
  if (error.code === 11000) {
    // duplicate key
    return res.json({ status: 'error', error: 'Tên tài khoản đã được sử dụng' })
  }
  throw error
}
res.json({ status: 'ok' })
}

 // Đăng nhập
 export const userLenderLogin = async (req, res) => {
	const { username, password } = req.body;
	const user = await userLender.findOne({ username }).lean()
  
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