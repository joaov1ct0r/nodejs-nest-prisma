import { SignInServiceImp } from '@interfaces/services/auth/sign-in.service';
import { Module } from '@nestjs/common';
import { RepositoriesModule } from '@src/repositories/repositories.module';
import { SignInService } from '@services/auth/sign-in.service';
import { CreateJWTServiceImp } from '@interfaces/services/auth/create-jwt-token.service';
import { CreateJWTService } from '@services/auth/create-jwt-token.service';
import { JwtService } from '@nestjs/jwt';

const signInServiceProvider = {
  provide: SignInServiceImp,
  useClass: SignInService,
};

const createJwtTokenServiceProvider = {
  provide: CreateJWTServiceImp,
  useClass: CreateJWTService,
};

const jwtServiceProvider = {
  provide: JwtService,
  useClass: JwtService,
};

@Module({
  imports: [RepositoriesModule],
  providers: [
    signInServiceProvider,
    createJwtTokenServiceProvider,
    jwtServiceProvider,
  ],
  exports: [
    signInServiceProvider,
    createJwtTokenServiceProvider,
    jwtServiceProvider,
  ],
})
export class AuthorizationServicesModule {}
