import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SecretService extends ConfigService {
  constructor() {
    super();
  }

  keyAi = {
    gpt: this.get<string>('KEY_GPT'),
    gemini: this.get<string>('KEY_GEMINI'),
  };
}
