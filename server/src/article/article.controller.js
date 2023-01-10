import { BaseController } from '../common/base.controller.js';
import checkAuthMiddleware from '../auth/checkAuth.middleware.js';
import { ArticleService } from './article.service.js';
import { HttpError } from '../errors/http-error.class.js';
import { articleValidation } from '../validations/article.validations.js';
import { validationResult } from 'express-validator';

export class ArticleController extends BaseController {
	constructor(logger) {
		super(logger);

		this.ArticleService = new ArticleService();
		this.bindRoutes([
			{
				basePath: 'article',
				path: '/create',
				method: 'post',
				function: this.create,
				middlewares: [checkAuthMiddleware, ...articleValidation],
			},
		]);
	}

	async create(req, res, next) {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json(errors.array());
		}

		try {
			const { title, text, viewCount, tags, imageUrl } = req.body;
			const article = await this.ArticleService.create({
				user: req.user,
				title,
				text,
				viewCount,
				tags,
				imageUrl,
			});

			res.status(201).json({ article });
		} catch (error) {
			next(new HttpError(500, `Article creating error: ${error}`));
		}
	}
}
