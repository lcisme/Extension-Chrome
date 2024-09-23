import { Module } from '@nestjs/common';
import { ExtensionService } from './extension.service';
import { ExtensionController } from './extension.controller';
import { OpenaiModule } from 'src/openai/openai.module';
import { GeminiModule } from 'src/gemini/gemini.module';

@Module({
  imports: [OpenaiModule, GeminiModule],
  controllers: [ExtensionController],
  providers: [ExtensionService],
  exports: [ExtensionService],
})
export class ExtensionModule {}
