import jwt from 'jsonwebtoken';
import { secretKey, expiresIn, BASE_URL } from '../config.js';
import User from '../Model/userSchema.js';

const signJwt = (id) => {
	return jwt.sign({ id }, secretKey, {
		expiresIn: expiresIn
	});
};

export const userSignin = async (req, res) => {
	const { email, password } = req.body;

	// Find the user in the database
	const user = await User.findOne({ email });
	if (!user) {
		return res.status(404).json({ message: 'User not found' });
	}

	// Check if the password is correct
	if (!(await user.comparePassword(password, user.password))) {
		res.status(401).json({
			status: false,
			message: 'Unauthorsied User'
		});
	} else {
		// Generate JWT token
		const token = signJwt(user.id);

		res.json({ status: true, message: 'Login SuccessFull', token, user: user.userName });
	}
	res.status(500).json({ message: 'Internal server error' });
};

export const signup = async (req, res) => {
	let userPassword = req.body.password;
	// Find the user in the database
	let user = await User.findOne({ email: req.body.email });
	if (user) {
		return res.status(400).json({ status: false, message: 'User name already exists' });
	} else {
		const newUser = await User.create({
			userName: req.body.userName,
			email: req.body.email,
			password: userPassword
		});
		const token = signJwt(newUser.id);
		return res.status(201).json({ status: true, token, user: newUser.userName, message: 'Regsitration successful' });
	}
};

export const googleAuth = async (req, res) => {
	const { user } = req;
	if (!user?._json?.email) {
		return res.redirect(`${BASE_URL}/signin?error=No such user exists with the given email`);
	}
	const userEntity = await User.findOne({ email: user._json.email });
	if (!userEntity) {
		return res.redirect(`${BASE_URL}/signin?error=No such user exists with the given email`);
	}
	const token = signJwt(userEntity.id);
	return res.redirect(`${BASE_URL}/signin?token=${token}&user=${userEntity.userName}`);
};

export const logout = async (req, res) => {
	const token = req.headers.authorization.split(' ')[1];

	const decoded = jwt.verify(token, secretKey);

	const expToken = jwt.sign({ id: decoded.id }, secretKey, {
		expiresIn: expiresIn
	});

	res.status(200).json({
		status: true,
		token: expToken,
		message: 'Logged out successfully!'
	});
};
