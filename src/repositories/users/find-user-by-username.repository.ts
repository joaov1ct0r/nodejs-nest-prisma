import { User } from '@entities/user';
import { PrismaProvider } from '@src/lib/prisma';
import { UserMap } from '@mappers/user-map.mapper';
import { Injectable } from '@nestjs/common';
import { FindUserByUsernameRepositoryImp } from '@interfaces/repositories/users/find-user-by-username.repository';

@Injectable()
export class FindUserByUsernameRepository
  extends PrismaProvider
  implements FindUserByUsernameRepositoryImp
{
  public async execute(username: string): Promise<User | null> {
    const user = await this.prisma.user.findFirst({
      where: { username },
    });

    const userWasntFound = user === null;

    if (userWasntFound) return null;

    return UserMap.toDomain(user);
  }
}
