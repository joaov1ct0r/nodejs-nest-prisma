import { CreateEventLogServiceImp } from '@interfaces/services/logs/create-event-log.service';
import { BaseController } from '@controllers/base.controller';
import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthGuard } from '@guards/auth.guard';

@Controller('/logout')
@UseGuards(AuthGuard)
export class SignOutController extends BaseController {
  constructor(createEventLogService: CreateEventLogServiceImp) {
    super(createEventLogService);
  }

  @Get()
  public async handle(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    res.clearCookie('authorization');
    res.clearCookie('user');

    await this._createEventLogService.execute({
      userId: req.token.userId,
      code: 200,
      description: `Usuário com id: ${req.token.userId} realizou sign out com sucesso!`,
    });

    return { message: 'Usuário deslogado com sucesso!' };
  }
}
