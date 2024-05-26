import { Module } from '@nestjs/common';
import { GetAllUsersController } from '@controllers/users/get-all.controller';
import { ServicesModule } from '@services/services.module';
import { CreateUserController } from '@controllers/users/create-user.controller';

@Module({
  imports: [ServicesModule],
  controllers: [CreateUserController, GetAllUsersController],
})
export class UsersControllerModule {}
