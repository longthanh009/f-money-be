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