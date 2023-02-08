import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import FileService from '../file/file.service.js';
import UserModel from '../models/User.js';
import { userDto } from '../common/dto/user.dto.js';

export class AuthService {
	async createUser({ password, email, fullName, avatarUrl }) {
		const salt = await bcrypt.genSalt(10);
		const passwordHash = await bcrypt.hash(password, salt);

		const newUser = await UserModel.create({
			email,
			fullName,
			avatarUrl,
			passwordHash,
		});

		if (avatarUrl) {
			FileService.moveFile(avatarUrl, 'avatars');
		}

		const token = await this.signJwt(newUser._id, process.env.SECRET_KEY);
		const userInfo = userDto(newUser);
		return { ...userInfo, token };
	}

	async validateUser({ email, password }) {
		const user = await UserModel.findOne({ email });

		if (!user) {
			return false;
		}

		const checkPassword = await bcrypt.compare(password, user.passwordHash);
		if (!checkPassword) {
			return false;
		}

		const token = await this.signJwt(user._id, process.env.SECRET_KEY);

		const userInfo = userDto(user);
		return { ...userInfo, token };
	}

	async checkAuth(userId) {
		const user = await UserModel.findById(userId);
		if (!user) {
			return false;
		}
		const token = await this.signJwt(user._id, process.env.SECRET_KEY);
		const userInfo = userDto(user);
		return { ...userInfo, token };
	}

	signJwt(userId, key) {
		return new Promise((resolve, reject) => {
			jwt.sign(
				{
					_id: userId,
				},
				key,
				{ expiresIn: '30d' },
				(err, token) => {
					if (err) {
						reject(err);
					}
					resolve(token);
				}
			);
		});
	}
}
