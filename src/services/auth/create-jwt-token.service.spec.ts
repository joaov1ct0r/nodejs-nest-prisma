import { EnvHelper } from '@helpers/env.helper';
import { ConfigService } from '@nestjs/config';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { CreateJWTService } from '@services/auth/create-jwt-token.service';
import { MockInstance } from 'vitest';
import { EnvSchema } from '@src/env';

const makeSut = () => {
  const configService: ConfigService<EnvSchema, true> = new ConfigService();
  const envHelper = new EnvHelper(configService);
  const jwtService = new JwtService();
  const sut = new CreateJWTService(jwtService, envHelper);

  return { sut };
};

describe('create jwt service [unit]', () => {
  let jwtServiceSpy: MockInstance<
    [payload: object | Buffer, options?: JwtSignOptions],
    Promise<string>
  >;

  let envHelperSpy: MockInstance<[key: keyof EnvSchema], string>;

  beforeAll(() => {
    vi.stubEnv('JWT_TOKEN_SECRET', 'secret');

    jwtServiceSpy = vi.spyOn(JwtService.prototype, 'signAsync');
    jwtServiceSpy.mockResolvedValueOnce('token');

    envHelperSpy = vi.spyOn(EnvHelper.prototype, 'get');
    envHelperSpy.mockResolvedValueOnce('secret');
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
    vi.unstubAllEnvs();
  });
});
