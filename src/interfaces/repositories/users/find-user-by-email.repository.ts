import { User } from '@entities/user';

export abstract class FindUserByEmailRepositoryImp {
  public abstract execute(email: string): Promise<User | null>;
}
