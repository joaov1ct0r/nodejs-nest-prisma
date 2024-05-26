import bcrypt from 'bcrypt';
import { BaseService } from '@services/base.service';
import { Injectable } from '@nestjs/common';
import { FindUserByUsernameRepositoryImp } from '@interfaces/repositories/users/find-user-by-username.repository';
import { CreateErrorLogRepositoryImp } from '@interfaces/repositories/logs/create-error-log.repository';
import { UserMap } from '@mappers/user-map.mapper';
import { UserDTO } from '@interfaces/entities/user';
import {
  SignInServiceDTO,
  SignInServiceImp,
} from '@interfaces/services/auth/sign-in.service';

@Injectable()
export class SignInService extends BaseService implements SignInServiceImp {
  readonly #findUserByUsernameRepository: FindUserByUsernameRepositoryImp;

  constructor(
    createErrorLogRepository: CreateErrorLogRepositoryImp,
    findUserByUsernameRepository: FindUserByUsernameRepositoryImp,
  ) {
    super(createErrorLogRepository);

    this.#findUserByUsernameRepository = findUserByUsernameRepository;
  }

  public async execute({
    username,
    password,
  }: SignInServiceDTO): Promise<UserDTO> {
    const user = await this.#findUserByUsernameRepository.execute(username);

    const userWasntFound = user === null;

    if (userWasntFound) {
      await this._createErrorLogRepository.execute({
        userId: 'unknown',
        code: 400,
        description: `Usuário com username: ${username} tentou realizar login porem não esta cadastrado`,
      });

      throw this.badRequest('Usuário não encontrado!');
    }

    const isPasswordsMatching = bcrypt.compareSync(password, user.password);

    const passwordsIsntMatching = isPasswordsMatching === false;

    if (passwordsIsntMatching) {
      await this._createErrorLogRepository.execute({
        userId: user.id,
        code: 401,
        description: `Usuário com id: ${user.id} tentou realizar login com a senha incorreta`,
      });

      throw this.forbidden('Falha na autenticação');
    }

    return UserMap.toDTO(user);
  }
}
