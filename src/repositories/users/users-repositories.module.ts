import { CountUsersRepositoryImp } from '@interfaces/repositories/users/count-users.repository';
import { GetAllUsersRepositoryImp } from '@interfaces/repositories/users/get-all.repository';
import { Module } from '@nestjs/common';
import { GetAllUsersRepository } from '@repositories/users/get-all.repository';
import { CountUsersRepository } from '@repositories/users/count-users.repository';
import { FindUserByIdRepository } from '@repositories/users/find-user-by-id.repository';
import { FindUserByIdRepositoryImp } from '@interfaces/repositories/users/find-user-by-id.repository';
import { FindUserByUsernameRepository } from '@repositories/users/find-user-by-username.repository';
import { FindUserByUsernameRepositoryImp } from '@interfaces/repositories/users/find-user-by-username.repository';

const findUserByUsernameRepositoryProvider = {
  provide: FindUserByUsernameRepositoryImp,
  useClass: FindUserByUsernameRepository,
};

const findUserByIdRepositoryProvider = {
  provide: FindUserByIdRepositoryImp,
  useClass: FindUserByIdRepository,
};

const getAllUsersRepositoryProvider = {
  provide: GetAllUsersRepositoryImp,
  useClass: GetAllUsersRepository,
};

const countUsersRepositoryProvider = {
  provide: CountUsersRepositoryImp,
  useClass: CountUsersRepository,
};

@Module({
  exports: [
    findUserByUsernameRepositoryProvider,
    findUserByIdRepositoryProvider,
    countUsersRepositoryProvider,
    getAllUsersRepositoryProvider,
  ],
  providers: [
    findUserByUsernameRepositoryProvider,
    findUserByIdRepositoryProvider,
    countUsersRepositoryProvider,
    getAllUsersRepositoryProvider,
  ],
})
export class UsersRepositoriesModule {}
