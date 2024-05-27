import { CreateErrorLogRepository } from '@repositories/logs/create-error-log.repository';
import { EditUserService } from '@services/users/edit-user.service';
import { FindUserByIdRepository } from '@repositories/users/find-user-by-id.repository';
import { FindUserByUsernameRepository } from '@repositories/users/find-user-by-username.repository';
import { FindUserByEmailRepository } from '@repositories/users/find-user-by-email.repository';
import { EditUserRepository } from '@repositories/users/edit-user.repository';
import { MockInstance } from 'vitest';
import bcrypt from 'bcrypt';
import { User } from '@entities/user';
import { UserPersistance } from '@interfaces/entities/user';
import { BadRequestException, ForbiddenException } from '@nestjs/common';
import { EditUserServiceDTO } from '@interfaces/services/users/edit-user.service';
import { TokenImp } from '@interfaces/entities/token';
import { UserMap } from '@mappers/user-map.mapper';
import {
  ErrorLogImp,
  ErrorLogPersistanceImp,
} from '@interfaces/entities/error-log';

const makeSut = () => {
  const createErrorLogRepository = new CreateErrorLogRepository();
  const findUserByIdRepository = new FindUserByIdRepository();
  const findUserByUsernameRepository = new FindUserByUsernameRepository();
  const findUserByEmailRepository = new FindUserByEmailRepository();
  const editUserRepository = new EditUserRepository();
  const sut = new EditUserService(
    createErrorLogRepository,
    findUserByIdRepository,
    findUserByUsernameRepository,
    findUserByEmailRepository,
    editUserRepository,
  );

  return { sut };
};

describe('edit user service [unit]', () => {
  let createErrorLogRepostorySpy: MockInstance<
    [errorLog: ErrorLogPersistanceImp],
    Promise<ErrorLogImp>
  >;

  let findUserByIdRepositorySpy: MockInstance<
    [userId: string],
    Promise<User | null>
  >;

  let findUserByUsernameRepositorySpy: MockInstance<
    [username: string],
    Promise<User | null>
  >;

  let findUserByEmailRepositorySpy: MockInstance<
    [email: string],
    Promise<User | null>
  >;

  let editUserRepositorySpy: MockInstance<
    [id: string, user: UserPersistance],
    Promise<User>
  >;

  let bcryptSpy: MockInstance;

  beforeAll(() => {
    createErrorLogRepostorySpy = vi.spyOn(
      CreateErrorLogRepository.prototype,
      'execute',
    );

    createErrorLogRepostorySpy.mockResolvedValue({
      id: 'any_id',
      userId: 'any_user_id',
      description: 'any_description',
      code: 400,
      timestamp: new Date(),
    });

    findUserByIdRepositorySpy = vi.spyOn(
      FindUserByIdRepository.prototype,
      'execute',
    );

    findUserByUsernameRepositorySpy = vi.spyOn(
      FindUserByUsernameRepository.prototype,
      'execute',
    );

    findUserByEmailRepositorySpy = vi.spyOn(
      FindUserByEmailRepository.prototype,
      'execute',
    );

    editUserRepositorySpy = vi.spyOn(EditUserRepository.prototype, 'execute');

    bcryptSpy = vi.spyOn(bcrypt, 'hashSync');
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should throw bad request exception if user try to edit a unregistered user', async () => {
    const { sut } = makeSut();
    const user: EditUserServiceDTO = {
      email: 'any_email@mail.com',
      id: 'any_id',
      username: 'any_username',
      name: 'any_name',
      password: 'any_password',
    };
    const token: TokenImp = { userId: 'any_id' };
    findUserByIdRepositorySpy.mockResolvedValueOnce(null);

    await expect(() => sut.execute(user, token)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should throw forbidden exception if user try to edit another user', async () => {
    const { sut } = makeSut();
    const user: EditUserServiceDTO = {
      email: 'any_email@mail.com',
      id: 'any_id',
      username: 'any_username',
      name: 'any_name',
      password: 'any_password',
    };
    const token: TokenImp = { userId: 'any_other_id' };
    findUserByIdRepositorySpy.mockResolvedValueOnce(
      UserMap.toDomain({
        email: 'any_email@mail.com',
        id: 'any_id',
        username: 'any_username',
        name: 'any_name',
        password: 'any_password',
        userWhoUpdatedId: null,
        createdAt: new Date(),
        updatedAt: null,
      }),
    );

    await expect(() => sut.execute(user, token)).rejects.toThrow(
      ForbiddenException,
    );
  });

  it('should throw bad request exception if user try to edit a user with unavailable username', async () => {
    const { sut } = makeSut();
    const user: EditUserServiceDTO = {
      email: 'any_email@mail.com',
      id: 'any_id',
      username: 'any_username',
      name: 'any_name',
      password: 'any_password',
    };
    const token: TokenImp = { userId: 'any_id' };
    findUserByIdRepositorySpy.mockResolvedValueOnce(
      UserMap.toDomain({
        email: 'any_email@mail.com',
        id: 'any_id',
        username: 'any_username',
        name: 'any_name',
        password: 'any_password',
        userWhoUpdatedId: null,
        createdAt: new Date(),
        updatedAt: null,
      }),
    );
    findUserByUsernameRepositorySpy.mockResolvedValueOnce(
      UserMap.toDomain({
        email: 'any_email@mail.com',
        id: 'any_other_id',
        username: 'any_username',
        name: 'any_name',
        password: 'any_password',
        userWhoUpdatedId: null,
        createdAt: new Date(),
        updatedAt: null,
      }),
    );

    await expect(() => sut.execute(user, token)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should throw bad request exception if user try to edit a user with unavailable email', async () => {
    const { sut } = makeSut();
    const user: EditUserServiceDTO = {
      email: 'any_email@mail.com',
      id: 'any_id',
      username: 'any_username',
      name: 'any_name',
      password: 'any_password',
    };
    const token: TokenImp = { userId: 'any_id' };
    findUserByIdRepositorySpy.mockResolvedValueOnce(
      UserMap.toDomain({
        email: 'any_email@mail.com',
        id: 'any_id',
        username: 'any_username',
        name: 'any_name',
        password: 'any_password',
        userWhoUpdatedId: null,
        createdAt: new Date(),
        updatedAt: null,
      }),
    );
    findUserByUsernameRepositorySpy.mockResolvedValueOnce(null);
    findUserByEmailRepositorySpy.mockResolvedValueOnce(
      UserMap.toDomain({
        email: 'any_email@mail.com',
        id: 'any_other_id',
        username: 'any_username',
        name: 'any_name',
        password: 'any_password',
        userWhoUpdatedId: null,
        createdAt: new Date(),
        updatedAt: null,
      }),
    );

    await expect(() => sut.execute(user, token)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should be able to edit user', async () => {
    const { sut } = makeSut();
    const user: EditUserServiceDTO = {
      email: 'any_email@mail.com',
      id: 'any_id',
      username: 'any_username',
      name: 'any_name',
      password: 'any_password',
    };
    const token: TokenImp = { userId: 'any_id' };
    findUserByIdRepositorySpy.mockResolvedValueOnce(
      UserMap.toDomain({
        email: 'any_email@mail.com',
        id: 'any_id',
        username: 'any_username',
        name: 'any_name',
        password: 'any_password',
        userWhoUpdatedId: null,
        createdAt: new Date(),
        updatedAt: null,
      }),
    );
    findUserByUsernameRepositorySpy.mockResolvedValueOnce(null);
    findUserByEmailRepositorySpy.mockResolvedValueOnce(null);
    editUserRepositorySpy.mockResolvedValueOnce(
      UserMap.toDomain({
        email: 'any_email@mail.com',
        id: 'any_id',
        username: 'any_username',
        name: 'any_name',
        password: 'any_password',
        userWhoUpdatedId: token.userId,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    );
    bcryptSpy.mockResolvedValueOnce('any_password');

    const updatedUser = await sut.execute(user, token);

    expect(updatedUser.userWhoUpdatedId).toBe(token.userId);
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });
});
