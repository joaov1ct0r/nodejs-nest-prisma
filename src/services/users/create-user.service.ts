import bcrypt from 'bcrypt';
import { UserMap } from '@mappers/user-map.mapper';
import { UserDTO } from '@interfaces/entities/user';
import { BaseService } from '@services/base.service';
import { Injectable } from '@nestjs/common';
import { FindUserByUsernameRepositoryImp } from '@interfaces/repositories/users/find-user-by-username.repository';
import { FindUserByEmailRepositoryImp } from '@interfaces/repositories/users/find-user-by-email.repository';
import { CreateUserRepositoryImp } from '@interfaces/repositories/users/create-user.repository';
import { CreateErrorLogRepositoryImp } from '@interfaces/repositories/logs/create-error-log.repository';
import {
  CreateUserServiceDTO,
  CreateUserServiceImp,
} from '@interfaces/services/users/create-user.service';

@Injectable()
export class CreateUserService
  extends BaseService
  implements CreateUserServiceImp
{
  readonly #salt: number;
  readonly #findUserByUsernameRepository: FindUserByUsernameRepositoryImp;
  readonly #findUserByEmailRepository: FindUserByEmailRepositoryImp;
  readonly #createUserRepository: CreateUserRepositoryImp;

  constructor(
    createErrorLogRepository: CreateErrorLogRepositoryImp,
    findUserByUsernameRepository: FindUserByUsernameRepositoryImp,
    findUserByEmailRepository: FindUserByUsernameRepositoryImp,
    createUserRepository: CreateUserRepositoryImp,
  ) {
    super(createErrorLogRepository);

    this.#salt = 6;
    this.#findUserByUsernameRepository = findUserByUsernameRepository;
    this.#findUserByEmailRepository = findUserByEmailRepository;
    this.#createUserRepository = createUserRepository;
  }

  public async execute(userData: CreateUserServiceDTO): Promise<UserDTO> {
    const isUsernameInUseByOtherUser =
      await this.#findUserByUsernameRepository.execute(userData.username);

    const usernameIsntAvailable = isUsernameInUseByOtherUser !== null;

    if (usernameIsntAvailable) {
      await this._createErrorLogRepository.execute({
        userId: 'any_user_id',
        code: 400,
        description: `
          Usuário tentou realizar cadastro com "username": 
          ${userData.username}, porem já esta em uso pelo usuário com id: 
          ${isUsernameInUseByOtherUser.id}
        `,
      });

      throw this.badRequest(
        `Nome de usuário: ${userData.username} não esta disponivel`,
      );
    }

    const isEmailInUseByOtherUser =
      await this.#findUserByEmailRepository.execute(userData.email);

    const emailIsntAvailable = isEmailInUseByOtherUser !== null;

    if (emailIsntAvailable) {
      await this._createErrorLogRepository.execute({
        userId: 'any_user_id',
        code: 400,
        description: `
          Usuário tentou realizar cadastro com "email":
          ${userData.email}, porem já esta em uso pelo usuário com id:
          ${isEmailInUseByOtherUser.id}
          `,
      });

      throw this.badRequest(`Email: ${userData.email} não esta disponivel`);
    }

    userData.password = bcrypt.hashSync(userData.password, this.#salt);

    const user = await this.#createUserRepository.execute(userData);

    return UserMap.toDTO(user);
  }
}
