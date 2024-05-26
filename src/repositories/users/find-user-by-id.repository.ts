import { User } from '@entities/user';
import { PrismaProvider } from '@src/lib/prisma';
import { Injectable } from '@nestjs/common';
import { UserMap } from '@mappers/user-map.mapper';
import { FindUserByIdRepositoryImp } from '@interfaces/repositories/users/find-user-by-id.repository';

@Injectable()
export class FindUserByIdRepository
  extends PrismaProvider
  implements FindUserByIdRepositoryImp
{
  public async execute(userId: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    const userWasntFound = user === null;

    if (userWasntFound) return null;

    return UserMap.toDomain(user);
  }
}
