export class HttpError extends Error {
	constructor(statusCode, message, context) {
		super();
		this.statusCode = statusCode;
		this.message = message;
		this.context = context;
	}
}
