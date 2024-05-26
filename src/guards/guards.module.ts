import { Module } from '@nestjs/common';
import { AuthGuard } from '@guards/auth.guard';
import { JwtService } from '@nestjs/jwt';

const authGuardProvider = {
  provide: AuthGuard,
  useClass: AuthGuard,
};

const jwtServiceProvider = {
  provide: JwtService,
  useClass: JwtService,
};

@Module({
  providers: [authGuardProvider, jwtServiceProvider],
  exports: [authGuardProvider, jwtServiceProvider],
})
export class GuardsModule {}
