import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configureOpenAPI } from '@app/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule).then(configureOpenAPI);
  await app.listen(3000);
}
bootstrap();
