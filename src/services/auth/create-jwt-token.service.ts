import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  CreateJWTServiceImp,
  CreateJWTServiceResponse,
} from '@interfaces/services/auth/create-jwt-token.service';

@Injectable()
export class CreateJWTService implements CreateJWTServiceImp {
  readonly #jwtService: JwtService;

  constructor(jwtService: JwtService) {
    this.#jwtService = jwtService;
  }

  public async execute(id: string): Promise<CreateJWTServiceResponse> {
    const payload = { userId: id };

    const token = await this.#jwtService.signAsync(payload);

    return { token, payload };
  }
}
