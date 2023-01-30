import { BaseController } from '../common/base.controller.js';
import {
	registerValidation,
	loginValidation,
} from '../validations/auth.validations.js';
import validationErrorsMiddleware from '../validations/validationErrors.middleware.js';
import checkAuth from './checkAuth.middleware.js';
import { AuthService } from './auth.service.js';
import FileService from '../file/file.service.js';
import { HttpError } from '../errors/http-error.class.js';

export class AuthController extends BaseController {
	constructor(logger) {
		super(logger);
		this.AuthService = new AuthService();
		this.bindRoutes([
			{
				basePath: 'auth',
				path: '/register',
				method: 'post',
				function: this.register,
				middlewares: [registerValidation, validationErrorsMiddleware],
			},
			{
				basePath: 'auth',
				path: '/login',
				method: 'post',
				function: this.login,
				middlewares: [loginValidation, validationErrorsMiddleware],
			},
			{
				basePath: 'auth',
				path: '/me',
				method: 'get',
				function: this.checkAuth,
				middlewares: [checkAuth],
			},
		]);
	}

	async login(req, res, next) {
		const user = await this.AuthService.validateUser(req.body);
		if (!user) {
			return next(new HttpError(403, 'Wrong email or password'));
		}

		res.status(200).json({ ...user });
	}

	async register(req, res, next) {
		try {
			const user = await this.AuthService.createUser(req.body);
			res.json(user);
		} catch (error) {
			next(new HttpError(400, `Registration Error: ${error}`));
		}
	}

	async checkAuth(req, res, next) {
		const user = await this.AuthService.checkAuth(req.user);
		if (!user) {
			return next(new HttpError(403, 'Access error'));
		}
		res.status(200).json({ ...user });
	}
}
