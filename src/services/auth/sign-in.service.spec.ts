import { CreateErrorLogRepository } from '@repositories/logs/create-error-log.repository';
import { SignInService } from '@services/auth/sign-in.service';
import { FindUserByUsernameRepository } from '@repositories/users/find-user-by-username.repository';
import { MockInstance } from 'vitest';
import { User } from '@entities/user';
import { UserMap } from '@mappers/user-map.mapper';
import { BadRequestException, ForbiddenException } from '@nestjs/common';
import bcrypt from 'bcrypt';
import {
  ErrorLogImp,
  ErrorLogPersistanceImp,
} from '@interfaces/entities/error-log';

const makeSut = () => {
  const createErrorLogRepository = new CreateErrorLogRepository();
  const findUserByUsernameRepository = new FindUserByUsernameRepository();
  const sut = new SignInService(
    createErrorLogRepository,
    findUserByUsernameRepository,
  );

  return { sut };
};

describe('sign in service [unit]', () => {
  let createErrorLogRepositorySpy: MockInstance<
    [errorLog: ErrorLogPersistanceImp],
    Promise<ErrorLogImp>
  >;

  let findUserByUsernameRepositorySpy: MockInstance<
    [username: string],
    Promise<User | null>
  >;

  let bcryptSpy: MockInstance;

  beforeAll(() => {
    createErrorLogRepositorySpy = vi.spyOn(
      CreateErrorLogRepository.prototype,
      'execute',
    );

    createErrorLogRepositorySpy.mockResolvedValue({
      userId: 'any_user_id',
      id: 'any_error_log_id',
      description: 'any_description',
      code: 400,
      timestamp: new Date(),
    });

    findUserByUsernameRepositorySpy = vi.spyOn(
      FindUserByUsernameRepository.prototype,
      'execute',
    );

    bcryptSpy = vi.spyOn(bcrypt, 'compareSync');
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should throw bad request exception if user try to authenticate with unregistered username', async () => {
    const { sut } = makeSut();
    const credentials = {
      username: 'any_username',
      password: 'any_password',
    };
    findUserByUsernameRepositorySpy.mockResolvedValueOnce(null);

    await expect(sut.execute(credentials)).rejects.toThrow(BadRequestException);
  });

  it('should throw forbidden exception if user try to authenticate with invalid password', async () => {
    const { sut } = makeSut();
    const credentials = {
      username: 'any_username',
      password: 'any_password',
    };
    findUserByUsernameRepositorySpy.mockResolvedValueOnce(
      UserMap.toDomain({
        id: 'any_user_id',
        password: 'any_other_password',
        username: 'any_username',
        userWhoUpdatedId: null,
        userWhoCreatedId: 'any_other_user_id',
        updatedAt: null,
        createdAt: new Date(),
        email: 'any_email',
        name: 'any_name',
      }),
    );
    bcryptSpy.mockReturnValueOnce(false);

    await expect(sut.execute(credentials)).rejects.toThrow(ForbiddenException);
  });

  it('user should be able to sign in', async () => {
    const { sut } = makeSut();
    const credentials = {
      username: 'any_username',
      password: 'any_password',
    };
    findUserByUsernameRepositorySpy.mockResolvedValueOnce(
      UserMap.toDomain({
        id: 'any_user_id',
        password: 'any_password',
        username: 'any_username',
        name: 'any_name',
        email: 'any_email',
        createdAt: new Date(),
        updatedAt: null,
        userWhoCreatedId: 'any_other_user_id',
        userWhoUpdatedId: null,
      }),
    );
    bcryptSpy.mockResolvedValueOnce(true);

    const user = await sut.execute(credentials);

    expect(user).not.toHaveProperty('password');
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });
});
