import { z } from 'zod';
import { Response } from 'express';
import { SignInServiceImp } from '@interfaces/services/auth/sign-in.service';
import { CreateEventLogServiceImp } from '@interfaces/services/logs/create-event-log.service';
import { Body, Controller, Post, Res, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from '@pipes/zod-validation.pipe';
import { BaseController } from '@controllers/base.controller';
import { CreateCookieConfigServiceImp } from '@interfaces/services/auth/create-cookie-config.service';
import { CreateJWTServiceImp } from '@interfaces/services/auth/create-jwt-token.service';

const signInBodySchema = z.object({
  username: z.string({
    required_error: '"Nome de usuário" é obrigatório',
    invalid_type_error: '"Nome de usuário" deve estar no formato "String"',
  }),
  password: z.string({
    required_error: '"Senha do usuário" é obrigatório',
    invalid_type_error: '"Senha do usuário" deve estar no formato "String"',
  }),
});

export type SignInDTO = z.infer<typeof signInBodySchema>;

@Controller('/login')
export class SignInController extends BaseController {
  readonly #signInService: SignInServiceImp;
  readonly #createJwtService: CreateJWTServiceImp;
  readonly #createCookieConfigService: CreateCookieConfigServiceImp;

  constructor(
    createEventLogService: CreateEventLogServiceImp,
    signInService: SignInServiceImp,
    createJwtService: CreateJWTServiceImp,
    createCookieConfigService: CreateCookieConfigServiceImp,
  ) {
    super(createEventLogService);

    this.#signInService = signInService;
    this.#createJwtService = createJwtService;
    this.#createCookieConfigService = createCookieConfigService;
  }

  @Post()
  @UsePipes(new ZodValidationPipe(signInBodySchema))
  public async handle(
    @Body() credentials: SignInDTO,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.#signInService.execute(credentials);
    const { token } = await this.#createJwtService.execute(user.id);
    const cookieConfig = this.#createCookieConfigService.execute('localhost');

    res.cookie('authorization', `Bearer ${token}`, cookieConfig);
    res.cookie('user', JSON.stringify(user), cookieConfig);

    await this._createEventLogService.execute({
      userId: user.id,
      code: 201,
      description: `Usuário com id: ${user.id} realizou autenticação com sucesso!`,
    });

    return {
      token,
      statusCode: 201,
      resource: user,
      message: 'Autenticação realizada com sucesso!',
    };
  }
}
