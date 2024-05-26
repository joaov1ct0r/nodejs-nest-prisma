import { UserDTO } from '@interfaces/entities/user';

export interface CreateUserServiceDTO {
  name: string;
  username: string;
  email: string;
  password: string;
}

export abstract class CreateUserServiceImp {
  public abstract execute(userData: CreateUserServiceDTO): Promise<UserDTO>;
}
