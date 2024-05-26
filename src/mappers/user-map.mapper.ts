import { User } from '@entities/user';
import { UserDTO, UserImp, UserPersistance } from '@interfaces/entities/user';

export class UserMap {
  public static toDomain(rawUser: UserImp): User {
    const user = new User(rawUser);

    return user;
  }

  public static toDTO(user: User): UserDTO {
    return {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
      userWhoCreatedId: user.userWhoCreatedId,
      updatedAt: user.updatedAt,
      userWhoUpdatedId: user.userWhoUpdatedId,
    };
  }

  public static toPersistance(user: User): UserPersistance {
    return {
      name: user.name,
      username: user.username,
      email: user.email,
      updatedAt: user.updatedAt,
      userWhoUpdatedId: user.userWhoUpdatedId,
      password: user.password,
    };
  }
}
