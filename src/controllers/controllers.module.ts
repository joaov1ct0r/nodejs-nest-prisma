import { Module } from '@nestjs/common';
import { UsersControllerModule } from '@controllers/users/users-controllers.module';

@Module({
  imports: [UsersControllerModule],
})
export class ControllersModule {}
