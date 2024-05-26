import { User } from '@entities/user';

export abstract class FindUserByIdRepositoryImp {
  public abstract execute(userId: string): Promise<User | null>;
}
