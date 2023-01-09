import express from 'express';
import mongoose from 'mongoose';
import config from 'config';
import { AuthController } from './auth/auth.controller.js';
import { ExceptionFiler } from './errors/exception.filter.js';

export class App {
	constructor(logger) {
		this.app = express();
		this.port = 4444;
		this.AuthController = new AuthController();
		this.ExceptionFiler = new ExceptionFiler(logger);
		this.logger = logger;
	}

	useRoutes() {
		this.app.use('/auth', this.AuthController.router);
	}

	useMiddleware() {
		this.app.use(express.json());
	}

	useExceptionFilter() {
		this.app.use(this.ExceptionFiler.catch.bind(this.ExceptionFiler));
	}

	async init() {
		this.useMiddleware();
		this.useRoutes();
		this.useExceptionFilter();
		mongoose.set('strictQuery', true);
		await mongoose.connect(config.get('DB_URL'));
		this.app.listen(this.port);
		this.logger.info(`Server started on https://localhost:${this.port}`);
	}
}
