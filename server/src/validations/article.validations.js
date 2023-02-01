import { body } from 'express-validator';

export const articleValidation = [
	body('title', 'Must be a string and Min: 5 symbols, Max: 100 symbols')
		.isLength({
			min: 5,
			max: 100,
		})
		.isString(),

	body('text', 'Must be a string and Max: 10000 symbols')
		.isString()
		.isLength({
			max: 10000,
		})
		.optional(),

	body('imageUrl', 'Wrong Image link').optional().isString(),

	body('tags', 'Tags must be a string').optional().isString(),

	body('viewCount', 'View count must be a number').isNumeric().optional(),
];

export const articleUpdateValidation = [
	body('title', 'Must be a string and Min: 5 symbols, Max: 100 symbols')
		.isLength({
			min: 5,
			max: 100,
		})
		.isString()
		.optional(),

	body('text', 'Must be a string and Max: 10000 symbols')
		.isLength({
			max: 10000,
		})
		.isString()
		.optional(),

	body('imageUrl', 'Wrong Image link').optional().isString(),

	body('tags', 'Tags must be a string').optional().isString(),

	body('viewCount', 'View count must be a number').optional().isNumeric(),
];
