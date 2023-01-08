import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import config from 'config';

export class App {
	constructor() {
		this.app = express();
		this.port = 4444;
	}

	useRoute() {
		this.app.get('/', (req, res) => {
			res.send('Hello app');
		});

		this.app.post('/auth/login', (req, res) => {
			const token = jwt.sign(
				{ email: req.body.email },
				config.get('secret-key')
			);

			res.json({
				success: true,
				token,
			});
		});
	}

	useMiddleware() {
		this.app.use(express.json());
	}

	async init() {
		this.useMiddleware();
		this.useRoute();
		mongoose.set('strictQuery', true);
		await mongoose.connect(config.get('dbURL'));
		this.app.listen(this.port, () => {
			`Server started ${this.port}`;
		});
	}
}
