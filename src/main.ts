import { NestFactory } from '@nestjs/core';
import { AppModule } from '@src/app.module';
import { EnvHelper } from '@helpers/env.helper';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  const envHelper = app.get(EnvHelper);
  const serverPort = envHelper.get('SERVER_PORT');

  await app.listen(serverPort);
}
bootstrap();
