import { Module } from '@nestjs/common';
import { RepositoriesModule } from '@repositories/repositories.module';
import { CreateEventLogService } from '@services/logs/create-event-log.service';
import { CreateEventLogServiceImp } from '@interfaces/services/logs/create-event-log.service';

const createEventLogServiceProvider = {
  provide: CreateEventLogServiceImp,
  useClass: CreateEventLogService,
};

@Module({
  providers: [createEventLogServiceProvider],
  exports: [createEventLogServiceProvider],
  imports: [RepositoriesModule],
})
export class EventLogServicesModule {}
