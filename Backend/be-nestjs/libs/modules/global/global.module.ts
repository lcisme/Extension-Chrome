import { Global, Module } from '@nestjs/common';
import { SecretsModule } from './secret/secret.module';
import { ClsModule } from 'nestjs-cls';

@Global()
@Module({
  imports: [
    SecretsModule,
    ClsModule.forRoot({
      global: true,
      middleware: {
        mount: true,
      },
    }),
  ],
  exports: [SecretsModule],
})
export class GlobalModule {}
