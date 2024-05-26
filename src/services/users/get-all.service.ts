import { UserDTO } from '@interfaces/entities/user';
import { BaseService } from '@services/base.service';
import { GetAllUsersRepositoryImp } from '@interfaces/repositories/users/get-all.repository';
import { UserMap } from '@src/mappers/user-map.mapper';
import { CreateErrorLogRepositoryImp } from '@interfaces/repositories/logs/create-error-log.repository';
import { Injectable } from '@nestjs/common';
import {
  GetAllUsersServiceDTO,
  GetAllUsersServiceImp,
} from '@interfaces/services/users/get-all-users.service';

@Injectable()
export class GetAllUsersService
  extends BaseService
  implements GetAllUsersServiceImp
{
  readonly #getAllUsersRepository: GetAllUsersRepositoryImp;

  constructor(
    createErrorLogRepository: CreateErrorLogRepositoryImp,
    getAllUsersRepository: GetAllUsersRepositoryImp,
  ) {
    super(createErrorLogRepository);

    this.#getAllUsersRepository = getAllUsersRepository;
  }

  public async execute(query: GetAllUsersServiceDTO): Promise<UserDTO[]> {
    const isNameProvided = !!query.name === true;
    const isEmailProvided = !!query.email === true;
    const isUsernameProvided = !!query.username === true;

    const isQuery = isNameProvided || isEmailProvided || isUsernameProvided;

    const users = await this.#getAllUsersRepository.execute(query, isQuery);

    return users.map(UserMap.toDTO);
  }
}
