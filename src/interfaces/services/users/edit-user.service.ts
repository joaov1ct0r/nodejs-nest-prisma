import { TokenImp } from '@interfaces/entities/token';
import { UserDTO } from '@interfaces/entities/user';

export interface EditUserServiceDTO {
  id: string;
  username: string;
  email: string;
  name: string;
  password?: string;
}

export abstract class EditUserServiceImp {
  public abstract execute(
    user: EditUserServiceDTO,
    token: TokenImp,
  ): Promise<UserDTO>;
}
