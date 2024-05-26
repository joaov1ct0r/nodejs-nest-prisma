import { UserDTO } from '@interfaces/entities/user';

export interface GetAllUsersServiceDTO {
  perPage: number;
  page: number;
  name?: string;
  email?: string;
  username?: string;
}

export abstract class GetAllUsersServiceImp {
  public abstract execute(query: GetAllUsersServiceDTO): Promise<UserDTO[]>;
}
