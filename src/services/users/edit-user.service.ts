import bcrypt from 'bcrypt';
import { TokenImp } from '@interfaces/entities/token';
import { UserDTO } from '@interfaces/entities/user';
import { CreateErrorLogRepositoryImp } from '@interfaces/repositories/logs/create-error-log.repository';
import { EditUserRepositoryImp } from '@interfaces/repositories/users/edit-user.repository';
import { FindUserByEmailRepositoryImp } from '@interfaces/repositories/users/find-user-by-email.repository';
import { FindUserByIdRepositoryImp } from '@interfaces/repositories/users/find-user-by-id.repository';
import { FindUserByUsernameRepositoryImp } from '@interfaces/repositories/users/find-user-by-username.repository';
import { BaseService } from '@services/base.service';
import { UserMap } from '@mappers/user-map.mapper';
import { Injectable } from '@nestjs/common';
import {
  EditUserServiceDTO,
  EditUserServiceImp,
} from '@interfaces/services/users/edit-user.service';

@Injectable()
export class EditUserService extends BaseService implements EditUserServiceImp {
  readonly #salt: number;
  readonly #findUserByIdRepository: FindUserByIdRepositoryImp;
  readonly #findUserByUsernameRepository: FindUserByUsernameRepositoryImp;
  readonly #findUserByEmailRepository: FindUserByEmailRepositoryImp;
  readonly #editUserRepository: EditUserRepositoryImp;

  constructor(
    createErrorLogRepository: CreateErrorLogRepositoryImp,
    findUserByIdRepository: FindUserByIdRepositoryImp,
    findUserByUsernameRepository: FindUserByUsernameRepositoryImp,
    findUserByEmailRepository: FindUserByEmailRepositoryImp,
    editUserRepository: EditUserRepositoryImp,
  ) {
    super(createErrorLogRepository);

    this.#salt = 6;

    this.#findUserByIdRepository = findUserByIdRepository;
    this.#findUserByUsernameRepository = findUserByUsernameRepository;
    this.#findUserByEmailRepository = findUserByEmailRepository;
    this.#editUserRepository = editUserRepository;
  }

  public async execute(
    user: EditUserServiceDTO,
    token: TokenImp,
  ): Promise<UserDTO> {
    const isUserRegistered = await this.#findUserByIdRepository.execute(
      user.id,
    );

    const userWasntFound = isUserRegistered === null;

    if (userWasntFound) {
      await this._createErrorLogRepository.execute({
        userId: token.userId,
        code: 400,
        description: `Usuário com id: ${token.userId} tentou editar usuário, porem usuário com id: ${user.id} não foi encontrado`,
      });

      throw this.badRequest('Usuário não encontrado!');
    }

    const isEditingOtherUser = isUserRegistered.id !== token.userId;

    if (isEditingOtherUser) {
      await this._createErrorLogRepository.execute({
        userId: token.userId,
        code: 403,
        description: `Usuário com id: ${token.userId} tentou editar usuário com id: ${isUserRegistered.id}, porem não tem permissão`,
      });

      throw this.forbidden('Não autorizado!');
    }

    const isUsernameInUseByOtherUser =
      await this.#findUserByUsernameRepository.execute(user.username);

    const usernameIsntAvailable =
      isUsernameInUseByOtherUser !== null &&
      isUsernameInUseByOtherUser.id !== isUserRegistered.id;

    if (usernameIsntAvailable) {
      await this._createErrorLogRepository.execute({
        userId: token.userId,
        code: 400,
        description: `Usuário com id: ${token.userId} tentou editar usuário, porem "username": ${user.username} já esta em uso pelo usuário com id: ${isUsernameInUseByOtherUser.id}`,
      });

      throw this.badRequest('Nome de usuário não esta disponivel');
    }

    const isEmailInUseByOtherUser =
      await this.#findUserByEmailRepository.execute(user.email);

    const emailIsntAvailable =
      isEmailInUseByOtherUser !== null &&
      isEmailInUseByOtherUser.id !== token.userId;

    if (emailIsntAvailable) {
      await this._createErrorLogRepository.execute({
        userId: token.userId,
        code: 400,
        description: `Usuário com id: ${token.userId} tentou editar usuário, porem "email": ${user.email} já esta em uso pelo usuário com id: ${isEmailInUseByOtherUser.id}`,
      });

      throw this.badRequest('Email não esta disponivel');
    }

    isUserRegistered.username = user.username;
    isUserRegistered.email = user.email;
    isUserRegistered.name = user.name;
    isUserRegistered.userWhoUpdatedId = token.userId;

    const shouldUpdatePassword = !!user.password === true;

    if (shouldUpdatePassword) {
      const hash = bcrypt.hashSync(user.password!, this.#salt);
      isUserRegistered.password = hash;
    }

    const updatedUser = await this.#editUserRepository.execute(
      isUserRegistered.id,
      UserMap.toPersistance(isUserRegistered),
    );

    return UserMap.toDTO(updatedUser);
  }
}
