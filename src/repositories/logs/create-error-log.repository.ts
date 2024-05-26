import { PrismaProvider } from '@src/lib/prisma';
import { Injectable } from '@nestjs/common';
import { CreateErrorLogRepositoryImp } from '@interfaces/repositories/logs/create-error-log.repository';
import {
  ErrorLogImp,
  ErrorLogPersistanceImp,
} from '@interfaces/entities/error-log';

@Injectable()
export class CreateErrorLogRepository
  extends PrismaProvider
  implements CreateErrorLogRepositoryImp
{
  public async execute(errorLog: ErrorLogPersistanceImp): Promise<ErrorLogImp> {
    const log = await this.prisma.errorLog.create({
      data: {
        userId: errorLog.userId,
        code: errorLog.code,
        description: errorLog.description,
      },
    });

    return log;
  }
}
