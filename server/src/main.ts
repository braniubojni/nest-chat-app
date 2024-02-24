import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const PORT = +(process.env.PORT || 9009);
  await app.listen(PORT, () => Logger.log(`Server on ${PORT}`));
}
bootstrap();
