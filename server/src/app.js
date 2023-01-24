import express from 'express';
import mongoose from 'mongoose';
import filleUpload from 'express-fileupload';
import cors from 'cors';
import config from 'config';
import { AuthController } from './auth/auth.controller.js';
import { ArticleController } from './article/article.controller.js';
import { TagsController } from './tags/tags.controller.js';
import { FileController } from './file/file.controller.js';
import { ExceptionFiler } from './errors/exception.filter.js';

export class App {
	constructor(logger) {
		this.app = express();
		this.port = 4444;
		this.logger = logger;
		this.AuthController = new AuthController(logger);
		this.ArticleController = new ArticleController(logger);
		this.TagsController = new TagsController(logger);
		this.FileController = new FileController(logger);
		this.ExceptionFiler = new ExceptionFiler(logger);
	}

	useRoutes() {
		this.app.use('/auth', this.AuthController.router);
		this.app.use('/articles', this.ArticleController.router);
		this.app.use('/tags', this.TagsController.router);
		this.app.use('/file', this.FileController.router);
	}

	useMiddleware() {
		this.app.use(cors());
		this.app.use(express.json());
		this.app.use(express.static('static'));
		this.app.use(filleUpload());
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
