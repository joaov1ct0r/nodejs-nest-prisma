import { BaseController } from '@controllers/base.controller';
import { CreateEventLogServiceImp } from '@interfaces/services/logs/create-event-log.service';
import { EditUserServiceImp } from '@interfaces/services/users/edit-user.service';
import { AuthGuard } from '@guards/auth.guard';
import { ZodValidationPipe } from '@pipes/zod-validation.pipe';
import { Request } from 'express';
import { z } from 'zod';
import {
  Put,
  Controller,
  UsePipes,
  UseGuards,
  Body,
  Req,
  HttpCode,
} from '@nestjs/common';

const editUserBodySchema = z.object({
  id: z.string({
    required_error: '"ID do usuário" é obrigatório',
    invalid_type_error: '"ID do usuário" deve estar no formato "String"',
  }),
  username: z.string({
    required_error: '"Nome de usuário" é obrigatório',
    invalid_type_error: '"Nome de usuário" deve estar no formato "String"',
  }),
  email: z.string({
    required_error: '"Email do usuário" é obrigatório',
    invalid_type_error: '"Email do usuário" deve estar no formato "String"',
  }),
  name: z.string({
    required_error: '"Nome do usuário" é obrigatório',
    invalid_type_error: '"Nome do usuário" deve estar no formato "String"',
  }),
  password: z.string().optional(),
});

export type EditUserDTO = z.infer<typeof editUserBodySchema>;

@Controller('/user/')
@UseGuards(AuthGuard)
export class EditUserController extends BaseController {
  readonly #editUserService: EditUserServiceImp;

  constructor(
    createEventLogService: CreateEventLogServiceImp,
    editUserService: EditUserServiceImp,
  ) {
    super(createEventLogService);

    this.#editUserService = editUserService;
  }

  @Put()
  @UsePipes(new ZodValidationPipe(editUserBodySchema))
  @HttpCode(204)
  public async handle(@Body() user: EditUserDTO, @Req() req: Request) {
    const updatedUser = await this.#editUserService.execute(user, req.token);

    await this._createEventLogService.execute({
      userId: req.token.userId,
      description: `Usuário com id: ${req.token.userId} editou usuário com id: ${updatedUser.id} com sucesso!`,
      code: 204,
    });

    return '';
  }
}
