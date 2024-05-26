import { DeleteUserServiceImp } from '@interfaces/services/users/delete-user.service';
import { BaseService } from '@services/base.service';
import { Injectable } from '@nestjs/common';
import { TokenImp } from '@interfaces/entities/token';
import { UserDTO } from '@interfaces/entities/user';
import { FindUserByIdRepositoryImp } from '@interfaces/repositories/users/find-user-by-id.repository';
import { DeleteUserRepositoryImp } from '@interfaces/repositories/users/delete-user.repository';
import { CreateErrorLogRepositoryImp } from '@interfaces/repositories/logs/create-error-log.repository';
import { UserMap } from '@mappers/user-map.mapper';

@Injectable()
export class DeleteUserService
  extends BaseService
  implements DeleteUserServiceImp
{
  readonly #findUserByIdRepository: FindUserByIdRepositoryImp;
  readonly #deleteUserRepository: DeleteUserRepositoryImp;

  constructor(
    createErrorLogRepository: CreateErrorLogRepositoryImp,
    findUserByIdRepository: FindUserByIdRepositoryImp,
    deleteUserRepository: DeleteUserRepositoryImp,
  ) {
    super(createErrorLogRepository);

    this.#findUserByIdRepository = findUserByIdRepository;
    this.#deleteUserRepository = deleteUserRepository;
  }

  public async execute(userId: string, token: TokenImp): Promise<UserDTO> {
    const isUserRegistered = await this.#findUserByIdRepository.execute(userId);

    const userWasntFound = isUserRegistered === null;

    if (userWasntFound) {
      await this._createErrorLogRepository.execute({
        userId: token.userId,
        code: 400,
        description: `Usuário com id: ${token.userId} tentou excluir usuário, porem usuário com id: ${userId} não foi encontrado`,
      });

      throw this.badRequest('Usuário não encontrado');
    }

    const isDeletingOtherUser = isUserRegistered.id !== token.userId;

    if (isDeletingOtherUser) {
      await this._createErrorLogRepository.execute({
        userId: token.userId,
        code: 403,
        description: `Usuário com id: ${token.userId} tentou excluir usuário com id: ${isUserRegistered.id}, porem não tem permissão`,
      });

      throw this.forbidden('Não autorizado');
    }

    const deletedUser = await this.#deleteUserRepository.execute(
      isUserRegistered.id,
    );

    return UserMap.toDTO(deletedUser);
  }
}
