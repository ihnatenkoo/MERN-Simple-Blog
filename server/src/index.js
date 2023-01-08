import { App } from './app.js';

const bootstrap = async () => {
	const app = new App();
	try {
		await app.init();
	} catch (error) {
		console.log(error);
	}
};

bootstrap();
