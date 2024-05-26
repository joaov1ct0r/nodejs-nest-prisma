import { UserDTO } from '@interfaces/entities/user';

export interface SignInServiceDTO {
  username: string;
  password: string;
}

export abstract class SignInServiceImp {
  public abstract execute(credentials: SignInServiceDTO): Promise<UserDTO>;
}
