import { CreateEventLogRepositoryImp } from '@interfaces/repositories/logs/create-event-log.repository';
import { Injectable } from '@nestjs/common';
import { CreateEventLogServiceImp } from '@interfaces/services/logs/create-event-log.service';
import {
  EventLogImp,
  EventLogPersistanceImp,
} from '@interfaces/entities/event-log';

@Injectable()
export class CreateEventLogService implements CreateEventLogServiceImp {
  readonly #createEventLogRepository: CreateEventLogRepositoryImp;

  constructor(createEventLogRepository: CreateEventLogRepositoryImp) {
    this.#createEventLogRepository = createEventLogRepository;
  }

  public async execute(eventLog: EventLogPersistanceImp): Promise<EventLogImp> {
    const createdEventLog =
      await this.#createEventLogRepository.execute(eventLog);

    return createdEventLog;
  }
}
