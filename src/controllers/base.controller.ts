import { BadRequestException } from '@nestjs/common';
import { CreateEventLogServiceImp } from '@interfaces/services/logs/create-event-log.service';

export abstract class BaseController {
  protected readonly _createEventLogService: CreateEventLogServiceImp;

  constructor(createEventLogService: CreateEventLogServiceImp) {
    this._createEventLogService = createEventLogService;
  }

  protected badRequest(message: string): BadRequestException {
    return new BadRequestException(message);
  }
}
