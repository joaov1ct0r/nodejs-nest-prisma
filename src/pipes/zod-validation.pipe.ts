import { ZodError, ZodSchema } from 'zod';
import { fromZodError } from 'zod-validation-error';
import { PipeTransform, BadRequestException } from '@nestjs/common';

export abstract class ZodValidationPipeImp<T> {
  public abstract transform(value: unknown): T;
}

export class ZodValidationPipe<T>
  implements PipeTransform, ZodValidationPipeImp<T>
{
  private readonly _schema: ZodSchema;

  constructor(schema: ZodSchema<T>) {
    this._schema = schema;
  }

  public transform(value: unknown): T {
    try {
      const result = this._schema.parse(value);
      return result;
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException({
          message: 'Validation failed',
          statusCode: 400,
          errors: fromZodError(error),
        });
      }

      throw new BadRequestException('Validation failed');
    }
  }
}
