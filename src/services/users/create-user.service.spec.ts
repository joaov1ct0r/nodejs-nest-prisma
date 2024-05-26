import bcrypt from 'bcrypt';
import { MockInstance } from 'vitest';
import { User } from '@entities/user';
import { CreateErrorLogRepository } from '@repositories/logs/create-error-log.repository';
import { CreateUserService } from '@services/users/create-user.service';
import { FindUserByUsernameRepository } from '@repositories/users/find-user-by-username.repository';
import { FindUserByEmailRepository } from '@repositories/users/find-user-by-email.repository';
import { CreateUserRepository } from '@repositories/users/create-user.repository';
import { CreateUserRepositoryDTO } from '@interfaces/repositories/users/create-user.repository';
import { BadRequestException } from '@nestjs/common';
import { CreateUserServiceDTO } from '@interfaces/services/users/create-user.service';
import { UserMap } from '@mappers/user-map.mapper';
import {
  ErrorLogImp,
  ErrorLogPersistanceImp,
} from '@interfaces/entities/error-log';

const makeSut = () => {
  const createErrorLogRepository = new CreateErrorLogRepository();
  const findUserByUsernameRepository = new FindUserByUsernameRepository();
  const findUserByEmailRepository = new FindUserByEmailRepository();
  const createUserRepository = new CreateUserRepository();
  const sut = new CreateUserService(
    createErrorLogRepository,
    findUserByUsernameRepository,
    findUserByEmailRepository,
    createUserRepository,
  );

  return { sut };
};

describe('create user service [unit]', () => {
  let createErrorLogRepositorySpy: MockInstance<
    [errorLog: ErrorLogPersistanceImp],
    Promise<ErrorLogImp>
  >;

  let findUserByUsernameRepositorySpy: MockInstance<
    [username: string],
    Promise<User | null>
  >;

  let findUserByEmailRepositorySpy: MockInstance<
    [email: string],
    Promise<User | null>
  >;

  let createUserRepositorySpy: MockInstance<
    [userData: CreateUserRepositoryDTO],
    Promise<User>
  >;

  let bcryptSpy: MockInstance;

  beforeAll(() => {
    createErrorLogRepositorySpy = vi.spyOn(
      CreateErrorLogRepository.prototype,
      'execute',
    );

    createErrorLogRepositorySpy.mockResolvedValue({
      id: 'any_error_log_id',
      description: 'any_description',
      code: 400,
      userId: 'any_user_id',
      timestamp: new Date(),
    });

    findUserByUsernameRepositorySpy = vi.spyOn(
      FindUserByUsernameRepository.prototype,
      'execute',
    );

    findUserByEmailRepositorySpy = vi.spyOn(
      FindUserByEmailRepository.prototype,
      'execute',
    );

    createUserRepositorySpy = vi.spyOn(
      CreateUserRepository.prototype,
      'execute',
    );

    bcryptSpy = vi.spyOn(bcrypt, 'hashSync');
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should throw bad request exception when user try to register with unavailable username', async () => {
    const { sut } = makeSut();
    const userData: CreateUserServiceDTO = {
      username: 'any_username',
      email: 'any_email@mail.com',
      name: 'any_name',
      password: 'any_password',
    };
    findUserByUsernameRepositorySpy.mockResolvedValueOnce(
      UserMap.toDomain({
        id: 'any_id',
        password: 'any_password',
        name: 'any_name',
        email: 'any_other@mail.com',
        username: 'any_username',
        userWhoUpdatedId: null,
        updatedAt: null,
        createdAt: new Date(),
      }),
    );

    await expect(() => sut.execute(userData)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should throw bad request exception when user try to register with unavailable email', async () => {
    const { sut } = makeSut();
    const userData: CreateUserServiceDTO = {
      username: 'any_username',
      email: 'any_email@mail.com',
      name: 'any_name',
      password: 'any_password',
    };
    findUserByUsernameRepositorySpy.mockResolvedValueOnce(null);
    findUserByEmailRepositorySpy.mockResolvedValueOnce(
      UserMap.toDomain({
        id: 'any_id',
        password: 'any_password',
        name: 'any_name',
        email: 'any_email@mail.com',
        username: 'any_username',
        userWhoUpdatedId: null,
        updatedAt: null,
        createdAt: new Date(),
      }),
    );

    await expect(() => sut.execute(userData)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should be able to create a new user', async () => {
    const { sut } = makeSut();
    const userData: CreateUserServiceDTO = {
      username: 'any_username',
      email: 'any_email@mail.com',
      name: 'any_name',
      password: 'any_password',
    };
    findUserByUsernameRepositorySpy.mockResolvedValueOnce(null);
    findUserByEmailRepositorySpy.mockResolvedValueOnce(null);
    bcryptSpy.mockResolvedValueOnce('any_password');
    createUserRepositorySpy.mockResolvedValueOnce(
      UserMap.toDomain({
        id: 'any_id',
        password: 'any_password',
        name: 'any_name',
        email: 'any_email@mail.com',
        username: 'any_username',
        userWhoUpdatedId: null,
        updatedAt: null,
        createdAt: new Date(),
      }),
    );

    const user = await sut.execute(userData);

    expect(user).toHaveProperty('id');
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });
});
