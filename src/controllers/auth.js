import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user";
const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk'


// Đăng ký
export const userRegistration = async (req, res) => {
    const { username, password: plainTextPassword, phone, CCCD, address} = req.body;

  if (!username || typeof username !== 'string') {
		return res.json({ status: 'error', error: 'Invalid username' })
	}

	if (!plainTextPassword || typeof plainTextPassword !== 'string') {
		return res.json({ status: 'error', error: 'Invalid password' })
	};

  if (plainTextPassword.length < 5) {
		return res.json({
			status: 'error',
			error: 'Password too small. Should be atleast 6 characters'
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
		console.log('User created successfully: ', response)
	} catch (error) {
		if (error.code === 11000) {
			// duplicate key
			return res.json({ status: 'error', error: 'Username already in use' })
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
		  return res.json({ status: 'error', error: 'Invalid username/password' })
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
  
	  res.json({ status: 'error', error: 'Invalid username/password' })
  }

  // Đổi mật khẩu
export const changePassword = async (req, res) => {
	const { token, newpassword: plainTextPassword } = req.body
  
	  if (!plainTextPassword || typeof plainTextPassword !== 'string') {
		  return res.json({ status: 'error', error: 'Invalid password' })
	  }
  
	if (plainTextPassword.length < 5) {
		  return res.json({
			  status: 'error',
			  error: 'Password too small. Should be atleast 6 characters'
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