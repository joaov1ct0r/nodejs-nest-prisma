import { z } from 'zod';
import { BadRequestException } from '@nestjs/common';
import {
  ZodValidationPipe,
  ZodValidationPipeImp,
} from '@pipes/zod-validation.pipe';
import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';

const schema = z.object({
  user: z.string().min(1, 'Usuário deve conter ao menos 1 letra'),
  id: z.number().min(0, 'Id deve ser igual ou maior que 0'),
});

type SchemaType = z.infer<typeof schema>;

describe('zod validation pipe [unit]', () => {
  let sut: ZodValidationPipeImp<SchemaType>;

  beforeAll(() => {
    sut = new ZodValidationPipe<SchemaType>(schema);
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  it('should throw bad request exception if validation fails', () => {
    expect(() => sut.transform({})).toThrowError(BadRequestException);
  });

  it('should return object if validation succeeds', () => {
    const body = { user: 'john doe', id: 1 };

    const validatedBody = sut.transform(body);

    expect(validatedBody).not.toBeNull();
    expect(validatedBody).toBeTypeOf(typeof body);
    expect(validatedBody).toEqual(body);
  });
});
