import jwt from 'jsonwebtoken';
import config from 'config';

export default (req, res, next) => {
	try {
		const bearer = req.headers.authorization;
		const token = bearer.split(' ')[1];
		const isValid = jwt.verify(token, config.get('SECRET_KEY'));
		req.user = isValid._id;
		next();
	} catch (error) {
		res.status(403).json({ message: 'Access error' });
	}
};
