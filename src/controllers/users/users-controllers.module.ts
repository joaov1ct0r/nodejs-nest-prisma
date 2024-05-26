import { Module } from '@nestjs/common';
import { GetAllUsersController } from '@controllers/users/get-all.controller';
import { ServicesModule } from '@services/services.module';

@Module({
  imports: [ServicesModule],
  controllers: [GetAllUsersController],
})
export class UsersControllerModule {}
