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

  // Đổi mật khẩu
export const userLenderChangePassword = async (req, res) => {
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
  
		  await userLender.updateOne(
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

//updateUserLender
export const updateUserLender = async (req,res)=>{
    try {
        const updatedUser = await userLender.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedUser);
      } catch (err) {
        res.status(500).json(err);
      }
  }

// DELETEUserLender
export const deleteUserLender = async (req,res)=>{
        try {
            await userLender.findByIdAndDelete(req.params.id);
            res.status(200).json("Người dùng đã bị xóa ...");
          } catch (err) {
            res.status(500).json(err);
          }
}


// get/:id
export const getUserLender = async (req,res)=>{
    try {
        const user = await userLender.findById(req.params.id);
        const { password, ...others } = user._doc;
        res.status(200).json(others);
      } catch (err) {
        res.status(500).json(err);
      }
  }

// Get 
export const getUsersLenders = async (req,res,next)=>{
    try {
      const users = await userLender.find();
      res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  }

export const logoutUsersLenders = async (req,res,next)=>{
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Đăng xuất thành công!",
  });
}