import { Module } from '@nestjs/common';
import { GetAllUsersController } from '@controllers/users/get-all.controller';
import { ServicesModule } from '@services/services.module';
import { CreateUserController } from '@controllers/users/create-user.controller';
import { GuardsModule } from '@guards/guards.module';

@Module({
  imports: [ServicesModule, GuardsModule],
  controllers: [CreateUserController, GetAllUsersController],
})
export class UsersControllerModule {}
