import { BaseController } from '../common/base.controller.js';
import { HttpError } from '../errors/http-error.class.js';
import { TagsService } from './tags.service.js';

export class TagsController extends BaseController {
	constructor(logger) {
		super(logger);
		this.TagsService = new TagsService();
		this.bindRoutes([
			{
				basePath: 'tags',
				path: '/',
				method: 'get',
				function: this.getLastTags,
			},
		]);
	}

	async getLastTags(req, res, next) {
		try {
			const tags = await this.TagsService.getLastTags();
			res.status(200).json(tags);
		} catch (error) {
			next(new HttpError(500, `Tags Loading error: ${error}`));
		}
	}
}
