import { validationResult } from 'express-validator';
import { BaseController } from '../common/base.controller.js';
import {
	registerValidation,
	loginValidation,
} from '../validations/auth.validations.js';
import checkAuth from './checkAuth.middleware.js';
import { AuthService } from './auth.service.js';

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

	async login(req, res) {
		try {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				return res.status(400).json(errors.array());
			}

			const user = await this.AuthService.validateUser(req.body);
			res.status(200).json({ ...user });
		} catch (error) {
			res.status(400).json(`Authorization error: ${error}`);
		}
	}

	async register(req, res) {
		try {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				return res.status(400).json(errors.array());
			}

			const user = await this.AuthService.createUser(req.body);
			res.json({ ...user });
		} catch (error) {
			res.status(400).json(`Registration error: ${error}`);
		}
	}

	async userInfo(req, res) {
		try {
			const user = await this.AuthService.getUserInfo(req.user);
			res.status(200).json({ ...user });
		} catch (error) {
			res.status(400).json(`Authorization error: ${error}`);
		}
	}
}
