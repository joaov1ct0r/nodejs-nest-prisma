import {
  EventLogImp,
  EventLogPersistanceImp,
} from '@interfaces/entities/event-log';

export abstract class CreateEventLogServiceImp {
  public abstract execute(
    eventLog: EventLogPersistanceImp,
  ): Promise<EventLogImp>;
}
