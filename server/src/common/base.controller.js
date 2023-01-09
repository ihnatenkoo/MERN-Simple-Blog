import { Router } from 'express';

export class BaseController {
	constructor() {
		this._router = Router();
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
		}
	}
}
