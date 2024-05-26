export interface CountUsersRepositoryDTO {
  perPage: number;
  page: number;
  name?: string;
  username?: string;
  email?: string;
}

export abstract class CountUsersRepositoryImp {
  public abstract execute(
    query: CountUsersRepositoryDTO,
    isQuery: boolean,
  ): Promise<number>;
}
