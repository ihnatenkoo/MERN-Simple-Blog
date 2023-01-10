import { body } from 'express-validator';

export const articleValidation = [
	body('title', 'Must be a string and Min: 5 symbols, Max: 100 symbols')
		.isLength({
			min: 5,
			max: 100,
		})
		.isString(),
	body('text', 'Must be a string and Min: 30 symbols, Max: 300 symbols')
		.isLength({
			min: 30,
			max: 300,
		})
		.isString(),
	body('imageUrl', 'Wrong Image link').optional().isURL(),
	body('tags', 'Tags must be a string').optional().isArray(),
	body('viewCount', 'View count must be a number').optional().isNumeric(),
];