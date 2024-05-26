import { EventLog } from '@prisma/client';
import { CreateEventLogRepository } from '@repositories/logs/create-event-log.repository';
import { CreateEventLogService } from '@services/logs/create-event-log.service';
import { MockInstance } from 'vitest';
import { EventLogPersistanceImp } from '@interfaces/entities/event-log';

const makeSut = () => {
  const createEventLogRepository = new CreateEventLogRepository();
  const sut = new CreateEventLogService(createEventLogRepository);

  return { sut };
};

describe('create event log service [unit]', () => {
  let createEventLogRepositorySpy: MockInstance<
    [eventLog: EventLogPersistanceImp],
    Promise<EventLog>
  >;

  beforeAll(() => {
    createEventLogRepositorySpy = vi.spyOn(
      CreateEventLogRepository.prototype,
      'execute',
    );
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('user should be able to create event log', async () => {
    const { sut } = makeSut();
    const eventLog: EventLogPersistanceImp = {
      code: 201,
      userId: 'any_user_id',
      description: 'any_description',
    };
    createEventLogRepositorySpy.mockResolvedValueOnce({
      id: 'any_id',
      code: 201,
      userId: 'any_user_id',
      timestamp: new Date(),
      description: 'any_description',
    });

    const createdEventLog = await sut.execute(eventLog);

    expect(createdEventLog).toHaveProperty('id');
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });
});
