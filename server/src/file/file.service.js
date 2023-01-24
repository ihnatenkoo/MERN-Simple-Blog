import * as uuid from 'uuid';
import path from 'path';
import fs from 'fs';
import { HttpError } from '../errors/http-error.class.js';

class FileService {
	saveFile(file, folder = '') {
		try {
			const folderName = path.resolve(`static/${folder}`);
			const fileName = uuid.v4() + '.jpg';
			const filePath = path.resolve(`static/${folder}`, fileName);

			if (!fs.existsSync(folderName)) {
				fs.mkdirSync(folderName, { recursive: true });
			}

			file.mv(filePath);
			return fileName;
		} catch (error) {
			throw new HttpError(500, `File upload error: ${error}`);
		}
	}

	deleteFile(fileName, folderName = '') {
		const filePath = path.resolve(`static/${folderName}`, fileName);

		if (fs.existsSync(filePath)) {
			fs.rm(filePath, (err) => {
				if (err) {
					console.error(err);
					throw new HttpError(500, 'File deleting error');
				}
			});

			return fileName;
		}

		throw new HttpError(404, 'File not found');
	}
}

export default new FileService();
