import ArticleModel from '../models/Article.js';

export class ArticleService {
	async create({ user, title, text, viewCount, tags, imageUrl }) {
		const newArticle = new ArticleModel({
			user,
			text,
			title,
			viewCount,
			tags,
			imageUrl,
		});

		return await newArticle.save();
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
}
