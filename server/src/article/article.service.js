import ArticleModel from '../models/Article.js';
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

	async getAll(sort) {
		switch (sort) {
			case 'new':
				return await ArticleModel.find()
					.sort({ createdAt: -1 })
					.populate('user');

			case 'popular': {
				return await ArticleModel.find()
					.sort({ viewCount: -1 })
					.populate('user');
			}
			default:
				return await ArticleModel.find().populate('user');
		}
	}

	async getOne(id) {
		return await ArticleModel.findOneAndUpdate(
			{ _id: id },
			{ $inc: { viewCount: 1 } },
			{ returnDocument: 'after' }
		)
			.populate('user')
			.exec();
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
}
