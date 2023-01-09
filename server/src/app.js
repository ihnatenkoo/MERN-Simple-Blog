import express from 'express';
import mongoose from 'mongoose';
import config from 'config';
import { AuthController } from './auth/auth.controller.js';

export class App {
	constructor() {
		this.app = express();
		this.AuthController = new AuthController();
		this.port = 4444;
	}

	useRoutes() {
		this.app.use('/auth', this.AuthController.router);
	}

	useMiddleware() {
		this.app.use(express.json());
	}

	async init() {
		this.useMiddleware();
		this.useRoutes();
		mongoose.set('strictQuery', true);
		await mongoose.connect(config.get('DB_URL'));
		this.app.listen(this.port, () => {
			`Server started ${this.port}`;
		});
	}
}
