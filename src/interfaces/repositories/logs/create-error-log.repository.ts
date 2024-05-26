import {
  ErrorLogImp,
  ErrorLogPersistanceImp,
} from '@interfaces/entities/error-log';

export abstract class CreateErrorLogRepositoryImp {
  public abstract execute(
    errorLog: ErrorLogPersistanceImp,
  ): Promise<ErrorLogImp>;
}
