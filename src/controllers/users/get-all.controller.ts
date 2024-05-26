import { GetAllUsersServiceImp } from '@interfaces/services/users/get-all-users.service';
import { z } from 'zod';
import { BaseController } from '@controllers/base.controller';
import { CreateEventLogServiceImp } from '@interfaces/services/logs/create-event-log.service';
import { ZodValidationPipe } from '@src/pipes/zod-validation.pipe';
import { CountUsersServiceImp } from '@interfaces/services/users/count-users.service';
import { Request } from 'express';
import { AuthGuard } from '@guards/auth.guard';
import {
  Controller,
  Get,
  Query,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';

const getAllUsersQuerySchema = z.object({
  perPage: z.coerce.number({
    required_error: 'Quantidade de items por pagina é obrigatório',
    invalid_type_error:
      'Quantidade de items por pagina deve estar no formato String/Number',
  }),
  page: z.coerce.number({
    required_error: 'Index da pagina é obrigatório',
    invalid_type_error: 'Index da pagina deve estar no formato String/Number',
  }),
  name: z.string().optional(),
  username: z.string().optional(),
  email: z.string().optional(),
});

export type GetAllUsersDTO = z.infer<typeof getAllUsersQuerySchema>;

@Controller('/user/')
@UseGuards(AuthGuard)
export class GetAllUsersController extends BaseController {
  readonly #getAllUsersService: GetAllUsersServiceImp;
  readonly #countUsersService: CountUsersServiceImp;

  constructor(
    createEventLogService: CreateEventLogServiceImp,
    getAllUsersService: GetAllUsersServiceImp,
    countUsersService: CountUsersServiceImp,
  ) {
    super(createEventLogService);

    this.#getAllUsersService = getAllUsersService;
    this.#countUsersService = countUsersService;
  }

  @Get()
  @UseGuards(AuthGuard)
  @UsePipes(new ZodValidationPipe(getAllUsersQuerySchema))
  public async handle(@Query() query: GetAllUsersDTO, @Req() req: Request) {
    const users = await this.#getAllUsersService.execute(query);
    const usersAmount = await this.#countUsersService.execute(query);

    const token = req.token;

    await this._createEventLogService.execute({
      userId: token.userId,
      code: 200,
      description: 'Buscou usuários com sucesso',
    });

    return {
      resource: users,
      message: 'Sucesso ao obter usuários',
      statusCode: 200,
      nextPage: query.page + 1,
      prevPage: query.page - 1,
      total: usersAmount,
    };
  }
}
