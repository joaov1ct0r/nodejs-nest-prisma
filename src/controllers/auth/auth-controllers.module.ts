import { Module } from '@nestjs/common';
import { SignInController } from '@controllers/auth/sign-in.controller';
import { ServicesModule } from '@services/services.module';

@Module({
  imports: [ServicesModule],
  controllers: [SignInController],
})
export class AuthControllerModule {}
