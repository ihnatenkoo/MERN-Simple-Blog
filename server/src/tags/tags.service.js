import ArticleModel from '../models/Article.js';

export class TagsService {
	async getLastTags() {
		const articles = await ArticleModel.find().sort({ createdAt: -1 }).limit(5);
		const tags = articles.map((a) => a.tags).flat();
		const uniqTags = Array.from(new Set(tags)).splice(0, 5);
		return uniqTags;
	}
}
