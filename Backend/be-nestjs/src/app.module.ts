import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExtensionModule } from './extension/extension.module';
import { GlobalModule } from 'libs/modules/global/global.module';

@Module({
  imports: [GlobalModule, ExtensionModule],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppService],
})
export class AppModule {}
