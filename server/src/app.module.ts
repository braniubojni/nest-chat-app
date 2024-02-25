import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { join } from 'path';
import { FileService } from './file/file.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [ChatGateway, AppService, FileService],
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'static'),
    }),
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
})
export class AppModule {}
