import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  readonly #jwtService: JwtService;

  constructor(jwtService: JwtService) {
    this.#jwtService = jwtService;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);

      if (!token) {
        throw new UnauthorizedException();
      }
      const payload = await this.#jwtService.verifyAsync(token, {
        secret: process.env.JWT_TOKEN_SECRET,
      });

      request['token'] = payload;
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(req: Request): string {
    const cookieAuthorizationWasntProvided = !req.cookies.authorization;

    if (cookieAuthorizationWasntProvided) {
      throw new UnauthorizedException('Token "authorization" não encontrado!');
    }

    const token: string = req.cookies.authorization.split(' ')[1];

    return token;
  }
}
