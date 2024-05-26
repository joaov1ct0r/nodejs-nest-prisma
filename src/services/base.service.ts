import { CreateErrorLogRepositoryImp } from '@interfaces/repositories/logs/create-error-log.repository';
import {
  BadRequestException,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';

export class BaseService {
  protected readonly _createErrorLogRepository: CreateErrorLogRepositoryImp;

  constructor(createErrorLogRepository: CreateErrorLogRepositoryImp) {
    this._createErrorLogRepository = createErrorLogRepository;
  }

  protected badRequest(message: string): BadRequestException {
    return new BadRequestException(message);
  }

  protected unauthorized(message: string): UnauthorizedException {
    return new UnauthorizedException(message);
  }

  protected forbidden(message: string): ForbiddenException {
    return new ForbiddenException(message);
  }
}
