import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { existsSync, mkdirSync } from 'fs';
import { writeFile } from 'fs/promises';
import { extname, join, resolve } from 'path';

@Injectable()
export class FileService {
  async createFile(
    file: Express.Multer.File,
    userName: string,
  ): Promise<string> {
    try {
      const ext = extname(file.originalname);
      const fileName = userName + ext;
      const filePath = resolve(__dirname, '..', 'static', 'avatars');
      if (!existsSync(filePath)) {
        mkdirSync(filePath, { recursive: true });
      }

      await writeFile(join(filePath, fileName), file.buffer);
      return fileName;
    } catch (error) {
      Logger.error(error.message);
      throw new HttpException(
        'Something went wrong while uploading the file',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
