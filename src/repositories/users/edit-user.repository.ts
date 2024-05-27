import { User } from '@entities/user';
import { UserPersistance } from '@interfaces/entities/user';
import { EditUserRepositoryImp } from '@interfaces/repositories/users/edit-user.repository';
import { PrismaProvider } from '@src/lib/prisma';
import { UserMap } from '@mappers/user-map.mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EditUserRepository
  extends PrismaProvider
  implements EditUserRepositoryImp
{
  public async execute(id: string, user: UserPersistance): Promise<User> {
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: user,
    });

    return UserMap.toDomain(updatedUser);
  }
}
