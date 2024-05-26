import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EnvHelper } from '@helpers/env.helper';
import {
  CreateJWTServiceImp,
  CreateJWTServiceResponse,
} from '@interfaces/services/auth/create-jwt-token.service';

@Injectable()
export class CreateJWTService implements CreateJWTServiceImp {
  readonly #jwtService: JwtService;
  readonly #token_secret: string;
  readonly #token_expiration: string;
  readonly #token_issuer: string;

  constructor(jwtService: JwtService, envHelper: EnvHelper) {
    this.#jwtService = jwtService;
    this.#token_secret = envHelper.get('JWT_TOKEN_SECRET');
    this.#token_expiration = '1h';
    this.#token_issuer = 'localhost';
  }

  public async execute(id: string): Promise<CreateJWTServiceResponse> {
    const payload = { userId: id };

    const token = await this.#jwtService.signAsync(payload, {
      secret: this.#token_secret,
      issuer: this.#token_issuer,
      expiresIn: this.#token_expiration,
      subject: payload.userId,
      audience: this.#token_issuer,
    });

    return { token, payload };
  }
}
