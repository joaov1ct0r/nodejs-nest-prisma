import { NestFactory } from '@nestjs/core';
import { AppModule } from '@src/app.module';
import { EnvHelper } from '@helpers/env.helper';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    credentials: true,
    origin: (origin, callback) => {
      if (!origin) return callback(null, false);

      return callback(null, true);
    },
  });
  app.use(cookieParser());

  const envHelper = app.get(EnvHelper);
  const serverPort = envHelper.get('SERVER_PORT');

  await app.listen(serverPort);
}

bootstrap();
