import { body } from 'express-validator';

export const commentValidation = [
	body('text', 'Max comment length is 2000 characters')
		.isLength({
			max: 2000,
		})
		.isString(),
];
