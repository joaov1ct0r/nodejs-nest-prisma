import { CreateErrorLogRepositoryImp } from '@interfaces/repositories/logs/create-error-log.repository';
import { CreateEventLogRepositoryImp } from '@interfaces/repositories/logs/create-event-log.repository';
import { Module } from '@nestjs/common';
import { CreateErrorLogRepository } from '@repositories/logs/create-error-log.repository';
import { CreateEventLogRepository } from './create-event-log.repository';

const createEventLogRepositoryProvider = {
  provide: CreateEventLogRepositoryImp,
  useClass: CreateEventLogRepository,
};

const createErrorLogRepositoryProvider = {
  provide: CreateErrorLogRepositoryImp,
  useClass: CreateErrorLogRepository,
};

@Module({
  providers: [
    createEventLogRepositoryProvider,
    createErrorLogRepositoryProvider,
  ],
  exports: [createEventLogRepositoryProvider, createErrorLogRepositoryProvider],
})
export class LogsRepositoriesModule {}
