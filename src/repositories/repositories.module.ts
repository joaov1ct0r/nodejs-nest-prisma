import { Module } from '@nestjs/common';
import { UsersRepositoriesModule } from '@repositories/users/users-repositories.module';
import { LogsRepositoriesModule } from '@repositories/logs/logs-repositories.module';

@Module({
  imports: [UsersRepositoriesModule, LogsRepositoriesModule],
  exports: [UsersRepositoriesModule, LogsRepositoriesModule],
})
export class RepositoriesModule {}
