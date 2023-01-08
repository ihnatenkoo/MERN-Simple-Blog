import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import config from 'config';
import { validationResult } from 'express-validator';
import { registerValidation } from './validations/auth.js';
import UserModel from './models/User.js';

export class App {
	constructor() {
		this.app = express();
		this.port = 4444;
	}

	useRoute() {
		this.app.post('/auth/login', async (req, res) => {
			try {
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
		});

		this.app.post('/auth/register', registerValidation, async (req, res) => {
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
		});
	}

	useMiddleware() {
		this.app.use(express.json());
	}

	async init() {
		this.useMiddleware();
		this.useRoute();
		mongoose.set('strictQuery', true);
		await mongoose.connect(config.get('DB_URL'));
		this.app.listen(this.port, () => {
			`Server started ${this.port}`;
		});
	}
}
