import { body } from 'express-validator';

export const registerValidation = [
	body('email', 'Wrong Email').isEmail(),

	body(
		'password',
		'Password must be a string and must have more than 5 characters'
	)
		.isLength({
			min: 5,
		})
		.isString(),

	body('fullName', 'Name must be a string and must have more than 4 characters')
		.isLength({
			min: 3,
		})
		.isString(),

	body('avatarUrl', 'Wrong Avatar link').optional().isString(),
];

export const loginValidation = [
	body('email', 'Wrong Email').isEmail(),

	body(
		'password',
		'Password must be a string and must have more than 5 characters'
	)
		.isLength({
			min: 5,
		})
		.isString(),
];
