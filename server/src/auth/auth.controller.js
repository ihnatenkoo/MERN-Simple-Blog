import { validationResult } from 'express-validator';
import { BaseController } from '../common/base.controller.js';
import {
	registerValidation,
	loginValidation,
} from '../validations/auth.validations.js';
import checkAuth from './checkAuth.middleware.js';
import { AuthService } from './auth.service.js';
import { HttpError } from '../errors/http-error.class.js';

export class AuthController extends BaseController {
	constructor() {
		super();
		this.AuthService = new AuthService();
		this.bindRoutes([
			{
				path: '/register',
				method: 'post',
				function: this.register,
				middlewares: [...registerValidation],
			},
			{
				path: '/login',
				method: 'post',
				function: this.login,
				middlewares: [...loginValidation],
			},
			{
				path: '/me',
				method: 'get',
				function: this.userInfo,
				middlewares: [checkAuth],
			},
		]);
	}

	async login(req, res, next) {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json(errors.array());
		}

		const user = await this.AuthService.validateUser(req.body);
		if (!user) {
			return next(new HttpError(403, 'Wrong email or password'));
		}

		res.status(200).json({ ...user });
	}

	async register(req, res, next) {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json(errors.array());
		}

		try {
			const user = await this.AuthService.createUser(req.body);
			res.json({ ...user });
		} catch (error) {
			next(new HttpError(400, `Registration Error: ${error}`));
		}
	}

	async userInfo(req, res, next) {
		const user = await this.AuthService.getUserInfo(req.user);
		if (!user) {
			return next(new HttpError(403, 'Access error'));
		}
		res.status(200).json({ ...user });
	}
}
