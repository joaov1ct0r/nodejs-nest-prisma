import { Injectable } from '@nestjs/common';
import { PrismaProvider } from '@src/lib/prisma';
import { UserMap } from '@mappers/user-map.mapper';
import {
  CreateUserRepositoryImp,
  CreateUserRepositoryDTO,
} from '@interfaces/repositories/users/create-user.repository';

@Injectable()
export class CreateUserRepository
  extends PrismaProvider
  implements CreateUserRepositoryImp
{
  public async execute(userData: CreateUserRepositoryDTO): Promise<User> {
    const user = await this.prisma.user.create({
      data: userData,
    });

    return UserMap.toDomain(user);
  }
}
