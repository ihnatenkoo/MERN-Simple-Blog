import { Logger } from 'tslog';

export class LoggerService {
	constructor() {
		this.logger = new Logger({
			displayInstanceName: false,
			displayLoggerName: false,
			displayFunctionName: false,
			displayFilePath: 'hidden',
		});
	}

	info(...args) {
		this.logger.info(...args);
	}

	error(...args) {
		this.logger.error(...args);
	}

	warn(...args) {
		this.logger.warn(...args);
	}
}
