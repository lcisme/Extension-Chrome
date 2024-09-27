import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExtensionModule } from './extension/extension.module';
import { GlobalModule } from 'libs/modules/global/global.module';
import { MongoDBModule } from 'libs/modules/mongodb/mongodb.module';

@Module({
  imports: [GlobalModule, MongoDBModule, ExtensionModule],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppService],
})
export class AppModule {}
