import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SecretService extends ConfigService {
  constructor() {
    super();
  }

  mongodb = {
    uri: this.get('MONGO_URI'),
  };

  keyAi = {
    gpt: this.get<string>('KEY_GPT'),
    gemini: this.get<string>('KEY_GEMINI'),
  };
}
