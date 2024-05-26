import { Module } from '@nestjs/common';
import { CountUsersRepositoryImp } from '@interfaces/repositories/users/count-users.repository';
import { GetAllUsersRepositoryImp } from '@interfaces/repositories/users/get-all.repository';
import { GetAllUsersRepository } from '@repositories/users/get-all.repository';
import { CountUsersRepository } from '@repositories/users/count-users.repository';
import { FindUserByIdRepository } from '@repositories/users/find-user-by-id.repository';
import { FindUserByIdRepositoryImp } from '@interfaces/repositories/users/find-user-by-id.repository';
import { FindUserByUsernameRepository } from '@repositories/users/find-user-by-username.repository';
import { FindUserByUsernameRepositoryImp } from '@interfaces/repositories/users/find-user-by-username.repository';
import { FindUserByEmailRepositoryImp } from '@interfaces/repositories/users/find-user-by-email.repository';
import { FindUserByEmailRepository } from '@repositories/users/find-user-by-email.repository';

const findUserByEmailRepositoryProvider = {
  provide: FindUserByEmailRepositoryImp,
  useClass: FindUserByEmailRepository,
};

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
    findUserByEmailRepositoryProvider,
    findUserByUsernameRepositoryProvider,
    findUserByIdRepositoryProvider,
    countUsersRepositoryProvider,
    getAllUsersRepositoryProvider,
  ],
  providers: [
    findUserByEmailRepositoryProvider,
    findUserByUsernameRepositoryProvider,
    findUserByIdRepositoryProvider,
    countUsersRepositoryProvider,
    getAllUsersRepositoryProvider,
  ],
})
export class UsersRepositoriesModule {}
