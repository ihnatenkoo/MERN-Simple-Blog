import { body } from 'express-validator';

export const registerValidation = [
	body('email', 'Wrong Email').isEmail(),
	body('password', 'Password must be more than 5 characters').isLength({
		min: 5,
	}),
	body('fullName', 'Name must be more than 4 characters').isLength({
		min: 3,
	}),
	body('avatarUrl', 'Wrong Avatar link').optional().isURL(),
];
