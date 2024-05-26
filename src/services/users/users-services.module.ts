import { Module } from '@nestjs/common';
import { GetAllUsersServiceImp } from '@interfaces/services/users/get-all-users.service';
import { GetAllUsersService } from '@services/users/get-all.service';
import { RepositoriesModule } from '@repositories/repositories.module';
import { CountUsersServiceImp } from '@interfaces/services/users/count-users.service';
import { CountUsersService } from '@services/users/count-users.service';
import { CreateUserServiceImp } from '@interfaces/services/users/create-user.service';
import { CreateUserService } from '@services/users/create-user.service';
import { DeleteUserServiceImp } from '@interfaces/services/users/delete-user.service';
import { DeleteUserService } from '@services/users/delete-user.service';

const deleteUserServiceProvider = {
  provide: DeleteUserServiceImp,
  useClass: DeleteUserService,
};

const createUserServiceProvider = {
  provide: CreateUserServiceImp,
  useClass: CreateUserService,
};

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
  exports: [
    deleteUserServiceProvider,
    createUserServiceProvider,
    countUsersServiceProvider,
    getAllUsersServiceProvider,
  ],
  providers: [
    deleteUserServiceProvider,
    createUserServiceProvider,
    countUsersServiceProvider,
    getAllUsersServiceProvider,
  ],
})
export class UsersServicesModule {}
