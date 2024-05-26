import { User } from '@entities/user';
import { PrismaProvider } from '@src/lib/prisma';
import { Injectable } from '@nestjs/common';
import { UserMap } from '@mappers/user-map.mapper';
import {
  GetAllUsersRepositoryImp,
  GetAllUsersRepositoryDTO,
} from '@interfaces/repositories/users/get-all.repository';

@Injectable()
export class GetAllUsersRepository
  extends PrismaProvider
  implements GetAllUsersRepositoryImp
{
  public async execute(
    query: GetAllUsersRepositoryDTO,
    isQuery: boolean,
  ): Promise<User[]> {
    const users = await this.prisma.user.findMany({
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

    return users.map(UserMap.toDomain);
  }
}
