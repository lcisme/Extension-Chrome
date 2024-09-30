import { Injectable, Logger } from '@nestjs/common';
import { ChatCompletionMessageParam } from 'openai/resources';
import { OpenAiService } from 'src/openai/openai.service';
import { ExtensionDto } from './dto/extension.dto';
import { GeminiAiService } from 'src/gemini/gemini.service';
import { AIService } from 'src/AI-model/ai-service.interface';
import { AIFactory } from 'src/AI-model/ai.factory';
import { CreateExtensionDto } from './dto/create-extension.dto';
import { Extension } from './extension.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ExtensionService {
  private readonly logger = new Logger(ExtensionService.name);

  constructor(
    @InjectModel(Extension.name)
    private readonly extensionModel: Model<Extension>,

    private readonly openaiService: OpenAiService,
    private readonly geminiAiService: GeminiAiService,
    private readonly aiFactory: AIFactory,
  ) {}

  async create(dto: CreateExtensionDto) {
    const newExtension = await this.extensionModel.create({ ...dto });
    return newExtension;
  }

  async requestToAI(dto: ExtensionDto) {
    const { language, text, model, option, ai } = dto;
    const extension = await this.extensionModel.findOne({ option });
    // Prompt
    const prompt = {
      translate: `Translate the following ${text} to ${language}`,
      optimize: `${text}`,
      grammarCheck: `${text}`,
      summary: `${text}`,
      explain: `${text}`,
    }[option];

    const messages: ChatCompletionMessageParam[] = [
      {
        role: 'system',
        content: extension.promptInstruction,
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

    const aiService: AIService = this.aiFactory.createAI(ai);
    const result = await aiService.askAI(messages, model);
    return result;
  }
}
