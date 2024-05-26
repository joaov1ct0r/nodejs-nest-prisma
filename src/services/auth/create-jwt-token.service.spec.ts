import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { CreateJWTService } from '@services/auth/create-jwt-token.service';
import { MockInstance } from 'vitest';

const makeSut = () => {
  const jwtService = new JwtService();
  const sut = new CreateJWTService(jwtService);

  return { sut };
};

describe('create jwt service [unit]', () => {
  let jwtServiceSpy: MockInstance<
    [payload: object | Buffer, options?: JwtSignOptions],
    Promise<string>
  >;

  beforeAll(() => {
    jwtServiceSpy = vi.spyOn(JwtService.prototype, 'signAsync');

    jwtServiceSpy.mockResolvedValueOnce('token');
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('user should be able to create jwt token', async () => {
    const { sut } = makeSut();
    const userId = 'any_user_id';

    const { payload, token } = await sut.execute(userId);

    expect(token).toEqual('token');
    expect(payload.userId).toEqual(userId);
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });
});
