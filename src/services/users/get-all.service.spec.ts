import { CreateErrorLogRepository } from '@src/repositories/logs/create-error-log.repository';
import { GetAllUsersService } from './get-all.service';
import { GetAllUsersRepository } from '@src/repositories/users/get-all.repository';
import { MockInstance } from 'vitest';
import { ErrorLogImp } from '@interfaces/entities/error-log';
import { GetAllUsersRepositoryDTO } from '@interfaces/repositories/users/get-all.repository';
import { User } from '@entities/user';
import { GetAllUsersServiceDTO } from '@interfaces/services/users/get-all-users.service';
import { UserMap } from '@src/mappers/user-map.mapper';

const makeSut = () => {
  const createErrorLogRepository = new CreateErrorLogRepository();
  const getAllUsersRepository = new GetAllUsersRepository();
  const sut = new GetAllUsersService(
    createErrorLogRepository,
    getAllUsersRepository,
  );

  return { sut };
};

describe('get all users service [unit]', () => {
  let createErrorLogRepositorySpy: MockInstance<
    [errorLog: ErrorLogImp],
    Promise<ErrorLogImp>
  >;
  let getAllUsersRepositorySpy: MockInstance<
    [query: GetAllUsersRepositoryDTO, isQuery: boolean],
    Promise<User[]>
  >;

  beforeAll(() => {
    createErrorLogRepositorySpy = vi.spyOn(
      CreateErrorLogRepository.prototype,
      'execute',
    );
    createErrorLogRepositorySpy.mockResolvedValue({
      id: 'any_id',
      code: 400,
      userId: 'any_user_id',
      timestamp: new Date(),
      description: 'any_description_error',
    });

    getAllUsersRepositorySpy = vi.spyOn(
      GetAllUsersRepository.prototype,
      'execute',
    );
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('user should be able to get all users', async () => {
    const { sut } = makeSut();
    const query: GetAllUsersServiceDTO = {
      page: 1,
      perPage: 20,
    };
    getAllUsersRepositorySpy.mockResolvedValueOnce([
      UserMap.toDomain({
        id: 'any_one_id',
        username: 'any_one_username',
        email: 'any_one_email',
        name: 'any_one_name',
        password: 'any_one_password',
        createdAt: new Date(),
        updatedAt: null,
        userWhoCreatedId: 'any_other_id',
        userWhoUpdatedId: null,
      }),
      UserMap.toDomain({
        id: 'any_second_id',
        username: 'any_second_username',
        email: 'any_second_email',
        name: 'any_second_name',
        password: 'any_second_password',
        createdAt: new Date(),
        updatedAt: null,
        userWhoCreatedId: 'any_other_id',
        userWhoUpdatedId: null,
      }),
    ]);

    const users = await sut.execute(query);

    expect(users.length).toEqual(2);
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });
});
