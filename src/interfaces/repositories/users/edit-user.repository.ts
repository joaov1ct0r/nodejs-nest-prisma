import { User } from '@entities/user';
import { UserPersistance } from '@interfaces/entities/user';

export abstract class EditUserRepositoryImp {
  public abstract execute(id: string, user: UserPersistance): Promise<User>;
}
