import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: false});
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(6000);
}
bootstrap();
