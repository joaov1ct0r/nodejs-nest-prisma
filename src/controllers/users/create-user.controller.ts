import { z } from 'zod';
import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { BaseController } from '@controllers/base.controller';
import { ZodValidationPipe } from '@pipes/zod-validation.pipe';
import { CreateUserServiceImp } from '@interfaces/services/users/create-user.service';
import { CreateEventLogServiceImp } from '@interfaces/services/logs/create-event-log.service';

const createUserBodySchema = z.object({
  username: z.string({
    required_error: '"Nome de usuário" é obrigatório',
    invalid_type_error: '"Nome de usuário" deve estar no formato "String"',
  }),
  email: z.string({
    required_error: '"Email" é obrigatório',
    invalid_type_error: '"Email" deve estar no formato "String"',
  }),
  name: z.string({
    required_error: '"Nome" é obrigatório',
    invalid_type_error: '"Nome" deve estar no formato "String"',
  }),
  password: z.string({
    required_error: '"Senha" é obrigatório',
    invalid_type_error: '"Senha" deve estar no formato "String"',
  }),
});

export type CreateUserDTO = z.infer<typeof createUserBodySchema>;

@Controller('/user/')
export class CreateUserController extends BaseController {
  readonly #createUserService: CreateUserServiceImp;

  constructor(
    createEventLogService: CreateEventLogServiceImp,
    createUserService: CreateUserServiceImp,
  ) {
    super(createEventLogService);

    this.#createUserService = createUserService;
  }

  @Post()
  @UsePipes(new ZodValidationPipe(createUserBodySchema))
  public async handle(@Body() userData: CreateUserDTO) {
    const user = await this.#createUserService.execute(userData);

    await this._createEventLogService.execute({
      userId: user.id,
      code: 201,
      description: `
        Usuário com id: ${user.id}, criado com sucesso!
      `,
    });

    return {
      statusCode: 201,
      resource: user,
      message: 'Usuário criado com sucesso!',
    };
  }
}
