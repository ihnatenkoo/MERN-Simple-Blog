import { Router } from 'express';

export class BaseController {
	constructor(logger) {
		this._router = Router();
		this.logger = logger;
	}

	get router() {
		return this._router;
	}

	bindRoutes(routes) {
		for (const route of routes) {
			const handler = route.function.bind(this);
			const pipeline = route.middlewares
				? [...route.middlewares, handler]
				: handler;
			this.router[route.method](route.path, pipeline);
			this.logger.info(`[${route.basePath}] Add ${route.method} ${route.path}`);
		}
	}
}
