import { Module } from '@nestjs/common';
import { UsersControllerModule } from '@controllers/users/users-controllers.module';
import { AuthControllerModule } from '@controllers/auth/auth-controllers.module';

@Module({
  imports: [UsersControllerModule, AuthControllerModule],
})
export class ControllersModule {}
