import ArticleModel from '../models/Article.js';
import FileService from '../common/file.service.js';

export class ArticleService {
	async create({ user, title, text, viewCount, tags, picture }) {
		const imageUrl = picture && FileService.saveFile(picture);

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
