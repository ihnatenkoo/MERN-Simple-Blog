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
				basePath: 'articles',
				path: '/',
				method: 'post',
				function: this.create,
				middlewares: [checkAuthMiddleware, ...articleValidation],
			},
			{
				basePath: 'articles',
				path: '/',
				method: 'get',
				function: this.getAll,
			},
			{
				basePath: 'articles',
				path: '/:id',
				method: 'get',
				function: this.getById,
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

	async getAll(req, res, next) {
		try {
			const articles = await this.ArticleService.getAll();
			res.status(200).json(articles);
		} catch (error) {
			next(new HttpError(500, `Articles loading error: ${error}`));
		}
	}

	async getById(req, res, next) {
		try {
			const article = await this.ArticleService.getOne(req.params.id);
			if (!article) {
				return next(new HttpError(404, `Article not found`));
			}
			res.status(200).json(article);
		} catch (error) {
			next(new HttpError(500, `Article loading error: ${error}`));
		}
	}
}