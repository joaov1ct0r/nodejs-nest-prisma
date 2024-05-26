export interface CountUsersServiceDTO {
  perPage: number;
  page: number;
  name?: string;
  username?: string;
  email?: string;
}

export abstract class CountUsersServiceImp {
  public abstract execute(query: CountUsersServiceDTO): Promise<number>;
}
