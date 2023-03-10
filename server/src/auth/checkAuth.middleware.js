import jwt from 'jsonwebtoken';
import { HttpError } from '../errors/http-error.class.js';

export default (req, res, next) => {
	try {
		const bearer = req.headers.authorization;
		const token = bearer.split(' ')[1];
		const isValid = jwt.verify(token, process.env.SECRET_KEY);

		req.user = isValid._id;
		next();
	} catch (error) {
		next(new HttpError(403, 'Access error'));
	}
};
