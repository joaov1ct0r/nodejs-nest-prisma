import { Module } from '@nestjs/common';
import { ControllersModule } from '@controllers/controllers.module';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from '@src/env';
import { HelpersModule } from '@helpers/helpers.module';

@Module({
  imports: [
    ControllersModule,
    HelpersModule,
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
