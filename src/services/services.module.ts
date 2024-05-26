import { Module } from '@nestjs/common';
import { UsersServicesModule } from '@services/users/users-services.module';
import { AuthorizationServicesModule } from '@services/auth/auth-services.module';
import { EventLogServicesModule } from '@services/logs/event-log-services.module';

@Module({
  exports: [
    UsersServicesModule,
    AuthorizationServicesModule,
    EventLogServicesModule,
  ],
  imports: [
    UsersServicesModule,
    AuthorizationServicesModule,
    EventLogServicesModule,
  ],
})
export class ServicesModule {}
