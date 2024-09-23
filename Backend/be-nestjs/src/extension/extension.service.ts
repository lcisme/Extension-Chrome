import { Injectable, Logger } from '@nestjs/common';
import { ChatCompletionMessageParam } from 'openai/resources';
import { OpenAiService } from 'src/openai/openai.service';
import { ExtensionDto } from './dto/extension.dto';
import { GeminiAiService } from 'src/gemini/gemini.service';

@Injectable()
export class ExtensionService {
  private readonly logger = new Logger(ExtensionService.name);

  constructor(
    private readonly openaiService: OpenAiService,
    private readonly geminiAiService: GeminiAiService,
  ) {}

  makePromptTranslate(language: string, text: string) {
    return `Translate the following text to ${language}, but only return the translated text without any additional explanation or comments: "${text}"`;
  }

  get translateText() {
    return 'You are a professional translator with expertise in multiple languages. Your task is to provide accurate and nuanced translations of the given text. Always maintain the context and cultural subtleties of the original text in your translations.';
  }
  get optimizeText() {
    return 'You are a highly skilled translation expert specializing in multiple languages. Your role is to deliver precise and contextually appropriate translations while preserving the original meaning and cultural nuances. Always aim for clarity and fluency in your translations, making them sound natural in the target language.';
  }

  async requestToAI(dto: ExtensionDto) {
    const { language, text, model, option, ai } = dto;
    // Prompt
    const prompt = {
      translate: this.makePromptTranslate(language, text),
      optimize: this.makePromptTranslate(language, text),
    }[option];

    // Instructions
    const instructions = {
      translate: this.translateText,
      optimize: this.optimizeText,
    }[option];

    const messages: ChatCompletionMessageParam[] = [
      {
        role: 'system',
        content: instructions,
      },
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: prompt,
          },
        ],
      },
    ];
    // Choose Ai
    const result = {
      gpt: await this.openaiService.askChatGPT(messages, model),
      gemini: await this.geminiAiService.askGemini(prompt),
    }[ai];
    return result;
  }
}
