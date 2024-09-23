import { Module } from '@nestjs/common';
import { GeminiAiService } from './gemini.service';

@Module({
  imports: [],
  controllers: [],
  providers: [GeminiAiService],
  exports: [GeminiAiService],
})
export class GeminiModule {}
