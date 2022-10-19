
import bcrypt from "bcryptjs";
import jwt from"jsonwebtoken";
const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk'
import Admin from "../models/admin"


// Đăng ký
export const adminRegistration = async (req, res) => {
  const { username, password: plainTextPassword} = req.body;

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
  const response = await Admin.create({
    username,
    password
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
export const adminLogin = async (req, res) => {
	const { username, password } = req.body;
	const user = await Admin.findOne({ username }).lean()
  
	if (!user) {
		  return res.json({ status: 'error', error: 'Tên đăng nhập hoặc tài khoản không hợp lệ!' })
	  }
  
	if (await bcrypt.compare(password, user.password)) {
		  // the username, password combination is successful
  
		  const token = jwt.sign(
			  {
				  id: user._id,
				  name: user.username
			  },
			  JWT_SECRET
		  )
  
		  return res.json({ status: 'ok', data: token })
	  }
  
	  res.json({ status: 'error', error: 'Tên đăng nhập hoặc tài khoản không hợp lệ!' })
  }
//  Log out admin
export const adminLogout = catchAsyncErrors(async (req, res) => {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
  
    res.status(200).json({
      success: true,
      message: "Đăng xuất thành công!",
    });
  });
