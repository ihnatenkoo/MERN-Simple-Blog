import { HttpError } from '../errors/http-error.class.js';
import { BaseController } from '../common/base.controller.js';
import checkAuthMiddleware from '../auth/checkAuth.middleware.js';
import { CommentService } from './comment.service.js';
import { commentValidation } from '../validations/comment.validation.js';
import validationErrors from '../validations/validationErrors.middleware.js';

export class CommentController extends BaseController {
	constructor(logger) {
		super(logger);

		this.CommentService = new CommentService();
		this.bindRoutes([
			{
				basePath: 'comment',
				path: '/last',
				method: 'get',
				function: this.getLast,
			},
			{
				basePath: 'comment',
				path: '/',
				method: 'post',
				function: this.add,
				middlewares: [checkAuthMiddleware, commentValidation, validationErrors],
			},
			{
				basePath: 'comment',
				path: '/:articleId/delete-comment/:commentId',
				method: 'delete',
				function: this.delete,
				middlewares: [checkAuthMiddleware],
			},
			{
				basePath: 'comment',
				path: '/',
				method: 'patch',
				function: this.update,
				middlewares: [checkAuthMiddleware],
			},
		]);
	}

	async add(req, res, next) {
		try {
			const userId = req.user;
			const { text, articleId } = req.body;

			const article = await this.CommentService.add(articleId, userId, text);

			if (!article) {
				return next(new HttpError(404, `Article not found`));
			}

			res.status(200).json(article);
		} catch (error) {
			next(new HttpError(500, `Article updating error: ${error}`));
		}
	}

	async delete(req, res, next) {
		try {
			const userId = req.user;
			const { articleId, commentId } = req.params;

			const comment = await this.CommentService.delete(
				commentId,
				userId,
				articleId
			);

			if (!comment) {
				return next(
					new HttpError(404, `Comment not found or does not belong to you`)
				);
			}

			res.status(200).json(comment);
		} catch (error) {
			next(new HttpError(500, `Comment deleting error: ${error}`));
		}
	}

	async update(req, res, next) {
		try {
			const userId = req.user;
			const { commentId, text } = req.body;

			const comment = await this.CommentService.update({
				userId,
				commentId,
				text,
			});

			res.status(200).json(comment);
		} catch (error) {
			next(new HttpError(500, `Comment updating error: ${error}`));
		}
	}

	async getLast(req, res, next) {
		try {
			const comments = await this.CommentService.getLast();
			res.status(200).json(comments);
		} catch (error) {
			next(new HttpError(500, `Last comments loading error: ${error}`));
		}
	}
}
