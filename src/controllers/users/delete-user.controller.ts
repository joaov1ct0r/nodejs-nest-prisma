import { z } from 'zod';
import { Request } from 'express';
import { BaseController } from '@controllers/base.controller';
import { ZodValidationPipe } from '@pipes/zod-validation.pipe';
import { AuthGuard } from '@guards/auth.guard';
import { DeleteUserServiceImp } from '@interfaces/services/users/delete-user.service';
import { CreateEventLogServiceImp } from '@interfaces/services/logs/create-event-log.service';
import {
  Controller,
  Delete,
  Query,
  UsePipes,
  UseGuards,
  Req,
  HttpCode,
} from '@nestjs/common';

const deleteUserQuerySchema = z.object({
  userId: z.string({
    required_error: '"ID do usuário" é obrigatório',
    invalid_type_error: '"ID do usuário" deve estar no formato "String"',
  }),
});

export type DeleteUserDTO = z.infer<typeof deleteUserQuerySchema>;

@Controller('/user/')
@UseGuards(AuthGuard)
export class DeleteUserController extends BaseController {
  readonly #deleteUserService: DeleteUserServiceImp;

  constructor(
    createEventLogService: CreateEventLogServiceImp,
    deleteUserService: DeleteUserServiceImp,
  ) {
    super(createEventLogService);

    this.#deleteUserService = deleteUserService;
  }

  @Delete()
  @UsePipes(new ZodValidationPipe(deleteUserQuerySchema))
  @HttpCode(204)
  public async handle(@Query() { userId }: DeleteUserDTO, @Req() req: Request) {
    const deletedUser = await this.#deleteUserService.execute(
      userId,
      req.token,
    );

    await this._createEventLogService.execute({
      userId: null,
      code: 204,
      description: `Usuário com id: ${deletedUser.id} deletado com sucesso pelo usuário: ${req.token.userId}`,
    });

    return '';
  }
}
