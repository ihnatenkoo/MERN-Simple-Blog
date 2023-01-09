import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from 'config';
import { validationResult } from 'express-validator';
import { BaseController } from '../common/base.controller.js';
import UserModel from '../models/User.js';
import {
	registerValidation,
	loginValidation,
} from '../validations/auth.validations.js';
import checkAuth from './checkAuth.middleware.js';

export class AuthController extends BaseController {
	constructor() {
		super();
		this.bindRoutes([
			{
				path: '/register',
				method: 'post',
				function: this.register,
				middlewares: [...registerValidation],
			},
			{
				path: '/login',
				method: 'post',
				function: this.login,
				middlewares: [...loginValidation],
			},
			{
				path: '/me',
				method: 'get',
				function: this.userInfo,
				middlewares: [checkAuth],
			},
		]);
	}

	async login(req, res) {
		try {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				return res.status(400).json(errors.array());
			}

			const { email, password } = req.body;
			const user = await UserModel.findOne({ email });

			if (!user) {
				return res.status(404).json({ message: 'User not found' });
			}

			const checkPassword = await bcrypt.compare(password, user.passwordHash);
			if (!checkPassword) {
				return res.status(400).json({ message: 'Wrong login or password' });
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

			const { passwordHash, ...userData } = user._doc;
			res.json({ ...userData, token });
		} catch (error) {
			res.status(400).json(`Authorization error: ${error}`);
		}
	}

	async register(req, res) {
		try {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				return res.status(400).json(errors.array());
			}

			const password = req.body.password;
			const salt = await bcrypt.genSalt(10);
			const hash = await bcrypt.hash(password, salt);

			const newUser = new UserModel({
				email: req.body.email,
				fullName: req.body.fullName,
				avatarUrl: req.body.avatarUrl,
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

			const { passwordHash, ...userData } = user._doc;

			res.json({ ...userData, token });
		} catch (error) {
			res.status(400).send(`Registration error: ${error}`);
		}
	}

	async userInfo(req, res) {
		try {
			const user = await UserModel.findById(req.user);

			if (!user) {
				return res.status(404).json({ message: `User not found` });
			}

			const { passwordHash, ...userData } = user._doc;

			res.status(200).json({ ...userData });
		} catch (error) {
			res.status(400).json({ message: `User Information error: ${error}` });
		}
	}
}
