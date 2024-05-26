import { User } from '@entities/user';

export abstract class FindUserByUsernameRepositoryImp {
  public abstract execute(username: string): Promise<User | null>;
}
