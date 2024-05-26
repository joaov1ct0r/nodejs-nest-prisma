import { Module } from '@nestjs/common';
import { SignInController } from '@controllers/auth/sign-in.controller';
import { ServicesModule } from '@services/services.module';
import { SignOutController } from '@controllers/auth/sign-out.controller';
import { GuardsModule } from '@guards/guards.module';

@Module({
  imports: [ServicesModule, GuardsModule],
  controllers: [SignInController, SignOutController],
})
export class AuthControllerModule {}
