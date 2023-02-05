import { HttpError } from '../errors/http-error.class.js';
import { BaseController } from '../common/base.controller.js';
import checkAuthMiddleware from '../auth/checkAuth.middleware.js';
import { CommentService } from './comment.service.js';

export class CommentController extends BaseController {
	constructor(logger) {
		super(logger);

		this.CommentService = new CommentService();
		this.bindRoutes([
			{
				basePath: 'comment',
				path: '/',
				method: 'post',
				function: this.add,
				middlewares: [checkAuthMiddleware],
			},
			{
				basePath: 'comment',
				path: '/:articleId/delete-comment/:commentId',
				method: 'delete',
				function: this.delete,
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
}
