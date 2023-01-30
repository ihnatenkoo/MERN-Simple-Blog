import {
	articleValidation,
	articleUpdateValidation,
} from '../validations/article.validations.js';
import validationErrorsMiddleware from '../validations/validationErrors.middleware.js';
import { HttpError } from '../errors/http-error.class.js';
import { BaseController } from '../common/base.controller.js';
import { ArticleService } from './article.service.js';
import checkAuthMiddleware from '../auth/checkAuth.middleware.js';
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
				middlewares: [
					checkAuthMiddleware,
					articleValidation,
					validationErrorsMiddleware,
				],
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
			{
				basePath: 'articles',
				path: '/:id',
				method: 'delete',
				function: this.delete,
				middlewares: [checkAuthMiddleware],
			},
			{
				basePath: 'articles',
				path: '/:id',
				method: 'patch',
				function: this.update,
				middlewares: [
					checkAuthMiddleware,
					articleUpdateValidation,
					validationErrorsMiddleware,
				],
			},
		]);
	}

	async create(req, res, next) {
		try {
			const { title, text, viewCount, tags, imageUrl } = req.body;
			const tagsArray = tags.split(',').map((t) => t.trim());

			const article = await this.ArticleService.create({
				user: req.user,
				tags: tagsArray,
				title,
				text,
				viewCount,
				imageUrl,
			});

			res.status(201).json(article);
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

	async delete(req, res, next) {
		try {
			const article = await this.ArticleService.delete(req.params.id, req.user);
			if (!article) {
				return next(
					new HttpError(404, `Article not found or does not belong to you`)
				);
			}
			res.status(200).json(article);
		} catch (error) {
			next(new HttpError(500, `Article deleting error: ${error}`));
		}
	}

	async update(req, res, next) {
		try {
			const articleId = req.params.id;
			const userId = req.user;
			const article = await this.ArticleService.update(
				articleId,
				userId,
				req.body
			);
			if (!article) {
				return next(
					new HttpError(404, `Article not found or does not belong to you`)
				);
			}
			res.status(200).json(article);
		} catch (error) {
			next(new HttpError(500, `Article updating error: ${error}`));
		}
	}
}
