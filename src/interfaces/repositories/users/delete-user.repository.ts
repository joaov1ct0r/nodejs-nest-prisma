import { User } from '@entities/user';

export abstract class DeleteUserRepositoryImp {
  public abstract execute(userId: string): Promise<User>;
}
