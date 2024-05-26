import { CreateErrorLogRepository } from '@repositories/logs/create-error-log.repository';
import { CountUsersService } from '@services/users/count-users.service';
import { CountUsersRepository } from '@repositories/users/count-users.repository';
import { MockInstance } from 'vitest';
import { ErrorLogImp } from '@interfaces/entities/error-log';
import { CountUsersRepositoryDTO } from '@interfaces/repositories/users/count-users.repository';
import { CountUsersServiceDTO } from '@interfaces/services/users/count-users.service';

const makeSut = () => {
  const createErrorLogRepository = new CreateErrorLogRepository();
  const countUsersRepository = new CountUsersRepository();
  const sut = new CountUsersService(
    createErrorLogRepository,
    countUsersRepository,
  );

  return { sut };
};

describe('count users service [unit]', () => {
  let createErrorLogRepositorySpy: MockInstance<
    [errorLog: ErrorLogImp],
    Promise<ErrorLogImp>
  >;

  let countUsersRepositorySpy: MockInstance<
    [query: CountUsersRepositoryDTO, isQuery: boolean],
    Promise<number>
  >;

  beforeAll(() => {
    createErrorLogRepositorySpy = vi.spyOn(
      CreateErrorLogRepository.prototype,
      'execute',
    );

    createErrorLogRepositorySpy.mockResolvedValueOnce({
      id: 'any_id',
      code: 400,
      userId: 'any_user_id',
      timestamp: new Date(),
      description: 'any_description',
    });

    countUsersRepositorySpy = vi.spyOn(
      CountUsersRepository.prototype,
      'execute',
    );
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  it('user should be able to get total users', async () => {
    const { sut } = makeSut();
    const query: CountUsersServiceDTO = {
      perPage: 20,
      page: 1,
    };
    countUsersRepositorySpy.mockResolvedValueOnce(2);

    const usersAmount = await sut.execute(query);

    expect(usersAmount).toEqual(2);
  });
});
