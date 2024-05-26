import { Module } from '@nestjs/common';
import { EnvHelper } from '@helpers/env.helper';

const envHelperProvider = {
  provide: EnvHelper,
  useClass: EnvHelper,
};

@Module({
  providers: [envHelperProvider],
  exports: [envHelperProvider],
})
export class HelpersModule {}
