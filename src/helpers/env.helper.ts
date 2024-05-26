import { ConfigService } from '@nestjs/config';
import { EnvSchema } from '@src/env';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EnvHelper {
  readonly #configService: ConfigService<EnvSchema, true>;

  constructor(configService: ConfigService<EnvSchema, true>) {
    this.#configService = configService;
  }

  public get<T extends keyof EnvSchema>(key: T) {
    return this.#configService.get<T>(key, { infer: true });
  }
}
