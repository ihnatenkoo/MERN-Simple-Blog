import { HttpError } from './http-error.class.js';

export class ExceptionFiler {
	catch(error, req, res, next) {
		if (error instanceof HttpError) {
			res.status(error.statusCode).json({ error: error.message });
		} else {
			res.status(500).json({ error: error.message });
		}
	}
}
