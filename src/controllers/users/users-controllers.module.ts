import { Module } from '@nestjs/common';
import { GetAllUsersController } from '@controllers/users/get-all.controller';
import { ServicesModule } from '@services/services.module';
import { CreateUserController } from '@controllers/users/create-user.controller';
import { GuardsModule } from '@guards/guards.module';
import { DeleteUserController } from '@controllers/users/delete-user.controller';
import { EditUserController } from '@controllers/users/edit-user.controller';

@Module({
  imports: [ServicesModule, GuardsModule],
  controllers: [
    CreateUserController,
    GetAllUsersController,
    DeleteUserController,
    EditUserController,
  ],
})
export class UsersControllerModule {}
