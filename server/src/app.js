import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import config from 'config';
import { registerValidation } from './validations/auth.js';
import { validationResult } from 'express-validator';

export class App {
	constructor() {
		this.app = express();
		this.port = 4444;
	}

	useRoute() {
		this.app.post('/auth/register', registerValidation, (req, res) => {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				return res.status(400).json(errors.array());
			}

			res.json({
				success: true,
			});
		});
	}

	useMiddleware() {
		this.app.use(express.json());
	}

	async init() {
		this.useMiddleware();
		this.useRoute();
		mongoose.set('strictQuery', true);
		await mongoose.connect(config.get('dbURL'));
		this.app.listen(this.port, () => {
			`Server started ${this.port}`;
		});
	}
}
