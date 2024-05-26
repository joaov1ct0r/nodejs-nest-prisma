import { CreateCookieConfigService } from '@services/auth/create-cookie-config.service';
import { CreateCookieConfigServiceImp } from '@interfaces/services/auth/create-cookie-config.service';

describe('create cookie config service [unit]', () => {
  let sut: CreateCookieConfigServiceImp;

  beforeAll(() => {
    vi.mock('ms', () => {
      return {
        default: vi.fn(() => 1_000_000),
      };
    });

    sut = new CreateCookieConfigService();
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  it('should be able to create a new cookie config', () => {
    const config = sut.execute('any_domain');

    expect(config.domain).toEqual('any_domain');
  });
});
