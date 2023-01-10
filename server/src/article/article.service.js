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

	async getAll() {
		return await ArticleModel.find().populate('user').exec();
	}
}
