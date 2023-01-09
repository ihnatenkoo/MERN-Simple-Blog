import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from 'config';
import UserModel from '../models/User.js';
import { userDto } from '../common/dto/user.dto.js';

export class AuthService {
	async createUser({ password, email, fullName, avatarUrl }) {
		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(password, salt);

		const newUser = new UserModel({
			email: email,
			fullName: fullName,
			avatarUrl: avatarUrl,
			passwordHash: hash,
		});

		const user = await newUser.save();

		const token = jwt.sign(
			{
				_id: user._id,
			},
			config.get('SECRET_KEY'),
			{
				expiresIn: '30d',
			}
		);

		const userInfo = userDto(user);
		return { ...userInfo, token };
	}

	async validateUser({ email, password }) {
		const user = await UserModel.findOne({ email });

		if (!user) {
			throw new Error('Wrong email or password');
		}

		const checkPassword = await bcrypt.compare(password, user.passwordHash);
		if (!checkPassword) {
			throw new Error('Wrong email or password');
		}

		const token = jwt.sign(
			{
				_id: user._id,
			},
			config.get('SECRET_KEY'),
			{
				expiresIn: '30d',
			}
		);

		const userInfo = userDto(user);
		return { ...userInfo, token };
	}

	async getUserInfo(userId) {
		const user = await UserModel.findById(userId);
		if (!user) {
			throw new Error('User not found');
		}
		return userDto(user);
	}
}
