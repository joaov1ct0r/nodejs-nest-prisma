import { Module } from '@nestjs/common';
import { GetAllUsersServiceImp } from '@interfaces/services/users/get-all-users.service';
import { GetAllUsersService } from '@services/users/get-all.service';
import { RepositoriesModule } from '@repositories/repositories.module';
import { CountUsersServiceImp } from '@interfaces/services/users/count-users.service';
import { CountUsersService } from '@services/users/count-users.service';

const getAllUsersServiceProvider = {
  provide: GetAllUsersServiceImp,
  useClass: GetAllUsersService,
};

const countUsersServiceProvider = {
  provide: CountUsersServiceImp,
  useClass: CountUsersService,
};

@Module({
  imports: [RepositoriesModule],
  exports: [countUsersServiceProvider, getAllUsersServiceProvider],
  providers: [countUsersServiceProvider, getAllUsersServiceProvider],
})
export class UsersServicesModule {}
