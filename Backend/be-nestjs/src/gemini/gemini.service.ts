import { GoogleGenerativeAI } from '@google/generative-ai';
import { Injectable, Logger } from '@nestjs/common';
import { SecretService } from 'libs/modules/global/secret/secret.service';

@Injectable()
export class GeminiAiService {
  private readonly logger = new Logger(GeminiAiService.name);
  private geminiAiService: GoogleGenerativeAI;

  constructor(private readonly secretService: SecretService) {
    this.geminiAiService = new GoogleGenerativeAI(
      this.secretService.keyAi.gemini,
    );
  }

  // async askGemini(prompt: string): Promise<string> {
  //   const model = this.geminiAiService.getGenerativeModel({
  //     model: 'gemini-1.5-flash',
  //   });

  //   const result = await model.generateContent(prompt);
  //   return result.response.text();
  // }

  async askAI(messages: any[], model: string): Promise<string> {
    const prompt = messages[1].content[0].text;
    const modelInstance = this.geminiAiService.getGenerativeModel({
      model,
    });

    const result = await modelInstance.generateContent(prompt);
    return result.response.text();
  }
}
