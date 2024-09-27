import { Module } from '@nestjs/common';
import { ExtensionService } from './extension.service';
import { ExtensionController } from './extension.controller';
import { OpenaiModule } from 'src/openai/openai.module';
import { GeminiModule } from 'src/gemini/gemini.module';
import { AIFactory } from 'src/AI-model/ai.factory';
import { MongooseModule } from '@nestjs/mongoose';
import { Extension, ExtensionSchema } from './extension.schema';

@Module({
  imports: [
    OpenaiModule,
    GeminiModule,
    MongooseModule.forFeature([
      { name: Extension.name, schema: ExtensionSchema },
    ]),
  ],
  controllers: [ExtensionController],
  providers: [ExtensionService, AIFactory],
  exports: [ExtensionService],
})
export class ExtensionModule {}
