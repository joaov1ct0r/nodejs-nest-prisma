import {
  EventLogImp,
  EventLogPersistanceImp,
} from '@interfaces/entities/event-log';

export abstract class CreateEventLogRepositoryImp {
  public abstract execute(
    eventLog: EventLogPersistanceImp,
  ): Promise<EventLogImp>;
}
