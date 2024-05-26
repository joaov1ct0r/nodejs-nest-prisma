import { User } from '@entities/user';
import { DeleteUserRepositoryImp } from '@interfaces/repositories/users/delete-user.repository';
import { PrismaProvider } from '@src/lib/prisma';
import { UserMap } from '@mappers/user-map.mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DeleteUserRepository
  extends PrismaProvider
  implements DeleteUserRepositoryImp
{
  public async execute(userId: string): Promise<User> {
    const user = await this.prisma.user.delete({
      where: { id: userId },
    });

    return UserMap.toDomain(user);
  }
}
