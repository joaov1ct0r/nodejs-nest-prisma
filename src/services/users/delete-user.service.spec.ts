import { CreateErrorLogRepository } from '@repositories/logs/create-error-log.repository';
import { DeleteUserService } from '@services/users/delete-user.service';
import { FindUserByIdRepository } from '@repositories/users/find-user-by-id.repository';
import { DeleteUserRepository } from '@repositories/users/delete-user.repository';
import { MockInstance } from 'vitest';
import { User } from '@entities/user';
import { BadRequestException, ForbiddenException } from '@nestjs/common';
import { TokenImp } from '@interfaces/entities/token';
import { UserMap } from '@mappers/user-map.mapper';
import {
  ErrorLogImp,
  ErrorLogPersistanceImp,
} from '@interfaces/entities/error-log';

const makeSut = () => {
  const createErrorLogRepository = new CreateErrorLogRepository();
  const findUserByIdRepository = new FindUserByIdRepository();
  const deleteUserRepository = new DeleteUserRepository();
  const sut = new DeleteUserService(
    createErrorLogRepository,
    findUserByIdRepository,
    deleteUserRepository,
  );

  return { sut };
};

describe('delete user service [unit]', () => {
  let createErrorLogRepositorySpy: MockInstance<
    [errorLog: ErrorLogPersistanceImp],
    Promise<ErrorLogImp>
  >;

  let findUserByIdRepositorySpy: MockInstance<
    [userId: string],
    Promise<User | null>
  >;

  let deleteUserRepositorySpy: MockInstance<[userId: string], Promise<User>>;

  beforeAll(() => {
    createErrorLogRepositorySpy = vi.spyOn(
      CreateErrorLogRepository.prototype,
      'execute',
    );

    createErrorLogRepositorySpy.mockResolvedValue({
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

    deleteUserRepositorySpy = vi.spyOn(
      DeleteUserRepository.prototype,
      'execute',
    );
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should throw bad request exception if user try to delete unregistered user', async () => {
    const { sut } = makeSut();
    const userId = 'any_user_id';
    const token: TokenImp = {
      userId: 'any_user_id',
    };
    findUserByIdRepositorySpy.mockResolvedValueOnce(null);

    await expect(() => sut.execute(userId, token)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should throw forbidden exception if user try to delete other user', async () => {
    const { sut } = makeSut();
    const userId = 'any_user_id';
    const token: TokenImp = {
      userId: 'any_other_user_id',
    };
    findUserByIdRepositorySpy.mockResolvedValueOnce(
      UserMap.toDomain({
        id: 'any_user_id',
        name: 'any_name',
        email: 'any_email',
        password: 'any_password',
        username: 'any_username',
        createdAt: new Date(),
        updatedAt: null,
        userWhoUpdatedId: null,
      }),
    );

    await expect(() => sut.execute(userId, token)).rejects.toThrow(
      ForbiddenException,
    );
  });

  it('should be able to delete a user', async () => {
    const { sut } = makeSut();
    const userId = 'any_user_id';
    const token: TokenImp = {
      userId: 'any_user_id',
    };
    findUserByIdRepositorySpy.mockResolvedValueOnce(
      UserMap.toDomain({
        id: 'any_user_id',
        name: 'any_name',
        email: 'any_email',
        password: 'any_password',
        username: 'any_username',
        createdAt: new Date(),
        updatedAt: null,
        userWhoUpdatedId: null,
      }),
    );
    deleteUserRepositorySpy.mockResolvedValueOnce(
      UserMap.toDomain({
        id: 'any_user_id',
        name: 'any_name',
        email: 'any_email',
        password: 'any_password',
        username: 'any_username',
        createdAt: new Date(),
        updatedAt: null,
        userWhoUpdatedId: null,
      }),
    );

    const deletedUser = await sut.execute(userId, token);

    expect(deletedUser).toHaveProperty('id');
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });
});
