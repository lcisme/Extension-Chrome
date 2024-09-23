import { Injectable, Logger } from '@nestjs/common';
import { SecretService } from 'libs/modules/global/secret/secret.service';
import { OpenAI } from 'openai';
import { ChatCompletionMessageParam, ChatModel } from 'openai/resources';

@Injectable()
export class OpenAiService {
  private readonly logger = new Logger(OpenAiService.name);
  private openAiService: OpenAI;

  constructor(private readonly secretService: SecretService) {
    this.openAiService = new OpenAI({
      apiKey: this.secretService.keyAi.gpt,
    });
  }

  async askChatGPT(
    messages: ChatCompletionMessageParam[],
    model: ChatModel,
  ): Promise<string | object> {
    const chatCompletes = await this.openAiService.chat.completions.create({
      model: model,
      messages,
      response_format: {
        type: 'text',
      },
    });

    return chatCompletes.choices[0].message.content;
  }
}
