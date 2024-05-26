import { PrismaProvider } from '@src/lib/prisma';
import { Injectable } from '@nestjs/common';
import {
  CountUsersRepositoryDTO,
  CountUsersRepositoryImp,
} from '@interfaces/repositories/users/count-users.repository';

@Injectable()
export class CountUsersRepository
  extends PrismaProvider
  implements CountUsersRepositoryImp
{
  public async execute(
    query: CountUsersRepositoryDTO,
    isQuery: boolean,
  ): Promise<number> {
    const users = await this.prisma.user.count({
      where: {
        AND: isQuery
          ? [
              {
                name: { contains: query.name },
                username: { contains: query.username },
                email: { contains: query.email },
              },
            ]
          : undefined,
      },
      orderBy: [
        {
          createdAt: 'desc',
        },
      ],
      skip: (query.page - 1) * query.perPage,
      take: query.perPage,
    });

    return users;
  }
}
