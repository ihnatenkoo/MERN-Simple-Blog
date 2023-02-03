import ArticleModel from '../models/Article.js';
import CommentModel from '../models/Comment.js';
import FileService from '../file/file.service.js';

export class ArticleService {
	async create({ user, title, text, viewCount, tags, imageUrl }) {
		if (imageUrl) {
			FileService.moveFile(imageUrl, 'posts');
		}

		const tagsArray = tags.split(',').map((t) => t.trim());

		return await ArticleModel.create({
			user,
			text,
			title,
			viewCount,
			tags: tagsArray,
			imageUrl,
		});
	}

	async delete(articleId, userId) {
		return await ArticleModel.findOneAndDelete({
			_id: articleId,
			user: userId,
		});
	}

	async getAll(sort, tag) {
		switch (sort) {
			case 'new':
				return await ArticleModel.find(tag ? { tags: tag } : {})
					.sort({ createdAt: -1 })
					.populate('user');

			case 'popular': {
				return await ArticleModel.find(tag ? { tags: tag } : {})
					.sort({ viewCount: -1 })
					.populate('user');
			}
			default:
				return await ArticleModel.find(tag ? { tags: tag } : {}).populate(
					'user'
				);
		}
	}

	async getOne(id) {
		return await ArticleModel.findOneAndUpdate(
			{ _id: id },
			{ $inc: { viewCount: 1 } },
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
	}

	async update(articleId, userId, title, text, tags, imageUrl) {
		if (imageUrl) {
			FileService.moveFile(imageUrl, 'posts');
		}

		const tagsArray = tags.split(',').map((t) => t.trim());

		return await ArticleModel.findOneAndUpdate(
			{ _id: articleId, user: userId },
			{ title, text, tags: tagsArray, imageUrl },
			{ returnDocument: 'after' }
		);
	}

	async addComment(articleId, userId, text) {
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
}
