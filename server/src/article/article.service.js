import ArticleModel from '../models/Article.js';

export class ArticleService {
	async create({ user, title, text, viewCount, tags, imageUrl }) {
		return await ArticleModel.create({
			user,
			text,
			title,
			viewCount,
			tags,
			imageUrl,
		});
	}

	async delete(articleId, userId) {
		return await ArticleModel.findOneAndDelete({
			_id: articleId,
			user: userId,
		});
	}

	async getAll() {
		return await ArticleModel.find().populate('user').exec();
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

	async update(articleId, userId, body) {
		return await ArticleModel.findOneAndUpdate(
			{ _id: articleId, user: userId },
			{ ...body },
			{ returnDocument: 'after' }
		);
	}
}
