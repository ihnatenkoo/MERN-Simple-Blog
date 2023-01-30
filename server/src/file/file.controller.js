import { BaseController } from '../common/base.controller.js';
import { HttpError } from '../errors/http-error.class.js';
import checkAuth from '../auth/checkAuth.middleware.js';
import FileService from './file.service.js';

export class FileController extends BaseController {
	constructor(logger) {
		super(logger);
		this.bindRoutes([
			{
				basePath: 'file',
				path: '/upload-preview',
				method: 'post',
				function: this.uploadPreview,
			},
			{
				basePath: 'file',
				path: '/delete',
				method: 'post',
				function: this.deleteFile,
				middlewares: [checkAuth],
			},
		]);
	}

	uploadPreview(req, res, next) {
		try {
			const file = req.files?.file;
			if (!file) return next(new HttpError(400, 'File not passed'));

			const filePath = FileService.saveFile(file, 'previews');
			res.status(201).json({ url: filePath });
		} catch (error) {
			next(error);
		}
	}

	deleteFile(req, res, next) {
		try {
			const { url, folder } = req.body;
			const deletedFile = FileService.deleteFile(url, folder);
			res.status(200).json({ deletedFile });
		} catch (error) {
			next(error);
		}
	}
}
