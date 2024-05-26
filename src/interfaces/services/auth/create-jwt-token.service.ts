export interface CreateJWTServiceResponsePayload {
  userId: string;
}

export interface CreateJWTServiceResponse {
  token: string;
  payload: CreateJWTServiceResponsePayload;
}

export abstract class CreateJWTServiceImp {
  public abstract execute(id: string): Promise<CreateJWTServiceResponse>;
}
