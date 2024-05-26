import ms from 'ms';
import { CookieOptions } from 'express';
import { Injectable } from '@nestjs/common';
import { CreateCookieConfigServiceImp } from '@interfaces/services/auth/create-cookie-config.service';

@Injectable()
export class CreateCookieConfigService implements CreateCookieConfigServiceImp {
  readonly #maxCookieAge;

  constructor() {
    this.#maxCookieAge = ms('1h');
  }

  public execute(domain: string): CookieOptions {
    return {
      httpOnly: true,
      maxAge: this.#maxCookieAge,
      sameSite: true,
      secure: true,
      domain,
    };
  }
}
