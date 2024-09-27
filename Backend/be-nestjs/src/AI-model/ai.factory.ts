import { Injectable } from '@nestjs/common';
import { AIService } from './ai-service.interface';
import { OpenAiService } from 'src/openai/openai.service';
import { GeminiAiService } from 'src/gemini/gemini.service';

@Injectable()
export class AIFactory {
  constructor(
    private readonly openAiService: OpenAiService,
    private readonly geminiAiService: GeminiAiService,
  ) {}

  createAI(type: string): AIService {
    switch (type) {
      case 'gpt':
        return this.openAiService;
      case 'gemini':
        return this.geminiAiService;
      default:
        throw new Error('Unsupported AI type');
    }
  }
}
