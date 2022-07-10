import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppDataSource } from './database/data-source';

async function bootstrap() {
  AppDataSource.initialize().then(async () => {
    const app = await NestFactory.create(AppModule);
    await app.listen(3000);
  });
}
bootstrap();
