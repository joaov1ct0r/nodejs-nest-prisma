import { User } from '@entities/user';

export interface GetAllUsersRepositoryDTO {
  perPage: number;
  page: number;
  name?: string;
  username?: string;
  email?: string;
}

export abstract class GetAllUsersRepositoryImp {
  public abstract execute(
    query: GetAllUsersRepositoryDTO,
    isQuery: boolean,
  ): Promise<User[]>;
}
