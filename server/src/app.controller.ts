import {
  Body,
  Controller,
  Logger,
  Post,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';
import { AuthDto } from './dto/auth.dto';
import { FileService } from './file/file.service';
@UsePipes(new ValidationPipe())
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly fileService: FileService,
  ) {}

  @Post('auth')
  async getHello(@Body() dto: AuthDto): Promise<boolean> {
    // If comed to this place it is valid
    Logger.log({ dto });
    return true;
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
