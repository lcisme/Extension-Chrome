import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
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
    console.log('Creating extension with dto:', dto);
    const extension = await this.extensionModel.findOne({
      nameModelAi: dto.nameModelAi,
    });
    if (extension) {
      throw new HttpException(
        'Extension already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    const newExtension = await this.extensionModel.create({ ...dto });
    return newExtension;
  }

  makePromptTranslate(language: string, text: string) {
    return `Translate the following text to ${language}, but only return the translated text without any additional explanation or comments: "${text}"`;
  }

  makePromptOptimize(text: string) {
    return `Rewrite the following sentence to improve its clarity, flow, and grammatical accuracy. Maintain the original meaning but enhance the sentence structure and vocabulary. Sentence: ${text}.`;
  }

  get translateText() {
    return 'You are a professional translator with expertise in multiple languages. Your task is to provide accurate and nuanced translations of the given text. Always maintain the context and cultural subtleties of the original text in your translations.';
  }
  get optimizeText() {
    return 'Please rewrite the following sentence to make it more coherent, improve the vocabulary, and ensure grammatical correctness. Maintain the original meaning and adapt the language to fit the context. Explanation Clarity: This instruction asks the model to focus on coherence, vocabulary improvement, and grammatical correctness, while retaining the original meaning. Contextual Fit: It also emphasizes the importance of adapting the sentence to the appropriate context.  ### Expected Output for Language Detection and Handling  - When detecting that a question or an image contains text in a different language (e.g., Chinese, Hindi, Vietnamese), you should follow these steps: - **Identify the Language:**`"Detect the Input Language"` from the image or text. - **Translate to detected language:**Solve the chemistry problem in English first, then `"translate the solution into the detected language"`. - **Provide Output in detected Language (required):**`"Return the Output in the Detected Language"` if the input is not in English.,lưu ý trả về đúng ngôn ngữ của user hỏi ';
  }

  async requestToAI(dto: ExtensionDto) {
    const { language, text, model, option, ai } = dto;
    // Prompt
    const prompt = {
      translate: this.makePromptTranslate(language, text),
      optimize: this.makePromptOptimize(text),
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

    const aiService: AIService = this.aiFactory.createAI(ai);
    const result = await aiService.askAI(messages, model);
    return result;
  }
}
