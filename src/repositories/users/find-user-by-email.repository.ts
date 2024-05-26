import { User } from '@entities/user';
import { FindUserByEmailRepositoryImp } from '@interfaces/repositories/users/find-user-by-email.repository';
import { PrismaProvider } from '@src/lib/prisma';
import { UserMap } from '@src/mappers/user-map.mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FindUserByEmailRepository
  extends PrismaProvider
  implements FindUserByEmailRepositoryImp
{
  public async execute(email: string): Promise<User | null> {
    const user = await this.prisma.user.findFirst({
      where: { email },
    });

    const userWasntFound = user === null;

    if (userWasntFound) return null;

    return UserMap.toDomain(user);
  }
}
