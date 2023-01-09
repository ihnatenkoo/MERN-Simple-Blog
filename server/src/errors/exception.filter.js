import { HttpError } from './http-error.class.js';

export class ExceptionFiler {
	constructor(logger) {
		this.logger = logger;
	}

	catch(error, req, res, next) {
		if (error instanceof HttpError) {
			this.logger.error(`[Status ${error.statusCode}]: ${error.message}`);
			res.status(error.statusCode).json({ error: error.message });
		} else {
			this.logger.error(`[Status 500]: ${error.message}`);
			res.status(500).json({ error: error.message });
		}
	}
}
