import ArticleModel from '../models/Article.js';
import CommentModel from '../models/Comment.js';

export class CommentService {
	async add(articleId, userId, text) {
		const comment = await CommentModel.create({
			text,
			user: userId,
			articleId,
		});

		const article = await ArticleModel.findOneAndUpdate(
			{ _id: articleId },
			{ $push: { comments: comment } },
			{ returnDocument: 'after' }
		).populate([
			{
				path: 'user',
				select: '-passwordHash -createdAt -updatedAt',
			},
			{
				path: 'comments',
				populate: {
					path: 'user',
					select: '-passwordHash -createdAt -updatedAt',
				},
			},
		]);

		return article;
	}

	async delete(commentId, userId, articleId) {
		const article = await ArticleModel.findOneAndUpdate(
			{
				_id: articleId,
				user: userId,
			},
			{ $pull: { comments: commentId } }
		);

		if (!article) {
			throw new Error('Comment deleting from article error');
		}

		const comment = await CommentModel.findOneAndDelete({
			_id: commentId,
			user: userId,
		});

		return comment;
	}

	async update({ userId, commentId, text }) {
		const comment = await CommentModel.findOneAndUpdate(
			{
				_id: commentId,
				user: userId,
			},
			{
				text,
			},
			{ returnDocument: 'after' }
		).populate([
			{
				path: 'user',
				select: '-passwordHash -createdAt -updatedAt',
			},
		]);

		return comment;
	}
}
