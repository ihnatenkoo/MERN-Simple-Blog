import { App } from './app.js';
import { LoggerService } from './logger/logger.service.js';

const bootstrap = async () => {
	const app = new App(new LoggerService());

	try {
		await app.init();
	} catch (error) {
		console.log(error);
	}
};

bootstrap();
