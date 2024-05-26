import { TokenImp } from '@interfaces/entities/token';
import { UserDTO } from '@interfaces/entities/user';

export abstract class DeleteUserServiceImp {
  public abstract execute(userId: string, token: TokenImp): Promise<UserDTO>;
}
