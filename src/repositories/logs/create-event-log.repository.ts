import { PrismaProvider } from '@src/lib/prisma';
import { Injectable } from '@nestjs/common';
import { CreateEventLogRepositoryImp } from '@interfaces/repositories/logs/create-event-log.repository';
import {
  EventLogImp,
  EventLogPersistanceImp,
} from '@interfaces/entities/event-log';

@Injectable()
export class CreateEventLogRepository
  extends PrismaProvider
  implements CreateEventLogRepositoryImp
{
  public async execute(eventLog: EventLogPersistanceImp): Promise<EventLogImp> {
    const createdEventLog = await this.prisma.eventLog.create({
      data: {
        userId: eventLog.userId,
        description: eventLog.description,
        code: eventLog.code,
      },
    });

    return createdEventLog;
  }
}
