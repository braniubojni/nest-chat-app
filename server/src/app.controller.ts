import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';
import { FileService } from './file/file.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly fileService: FileService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('avatar')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile()
    file: Express.Multer.File,
    @Body() avatarDto: { userName: string },
  ) {
    this.fileService.createFile(file, avatarDto.userName);
  }
}
