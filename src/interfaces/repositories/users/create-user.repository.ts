import { User } from '@entities/user';

export interface CreateUserRepositoryDTO {
  email: string;
  name: string;
  username: string;
  password: string;
}

export abstract class CreateUserRepositoryImp {
  public abstract execute(userData: CreateUserRepositoryDTO): Promise<User>;
}
