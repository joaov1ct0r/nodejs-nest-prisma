import { CookieOptions } from 'express';

export abstract class CreateCookieConfigServiceImp {
  public abstract execute(domain: string): CookieOptions;
}
