import { CreateErrorLogRepositoryImp } from '@interfaces/repositories/logs/create-error-log.repository';
import { CountUsersRepositoryImp } from '@interfaces/repositories/users/count-users.repository';
import { BaseService } from '@services/base.service';
import { Injectable } from '@nestjs/common';
import {
  CountUsersServiceDTO,
  CountUsersServiceImp,
} from '@interfaces/services/users/count-users.service';

@Injectable()
export class CountUsersService
  extends BaseService
  implements CountUsersServiceImp
{
  readonly #countUsersRepository: CountUsersRepositoryImp;

  constructor(
    createErrorLogRepository: CreateErrorLogRepositoryImp,
    countUsersRepository: CountUsersRepositoryImp,
  ) {
    super(createErrorLogRepository);

    this.#countUsersRepository = countUsersRepository;
  }

  public async execute(query: CountUsersServiceDTO): Promise<number> {
    const isNameProvided = !!query.name === true;
    const isUsernameProvided = !!query.username === true;
    const isEmailProvided = !!query.email === true;

    const isQuery = isNameProvided || isUsernameProvided || isEmailProvided;

    const users = await this.#countUsersRepository.execute(query, isQuery);

    return users;
  }
}
