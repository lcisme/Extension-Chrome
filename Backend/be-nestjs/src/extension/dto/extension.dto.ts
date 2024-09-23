import { IsEnum, IsOptional, IsString } from 'class-validator';
import { AiEnum, LanguageEnum, OptionEnum } from '../extension.enum';
import { ApiProperty } from '@nestjs/swagger';
import { ChatModel } from 'openai/resources';

export class ExtensionDto {
  @ApiProperty({ required: true, default: LanguageEnum.VIETNAMESE })
  @IsEnum(LanguageEnum, { message: 'Language is not exist' })
  language: LanguageEnum;

  @ApiProperty({ required: true, default: 'welcome to vietnam' })
  @IsString({ message: 'you must provide a text parameter' })
  text: string;

  @ApiProperty({ required: false, default: 'gpt-4o' })
  // @IsString({ message: 'you must provide a model parameter' })
  @IsString()
  @IsOptional()
  model: ChatModel;

  @ApiProperty({ required: true, default: OptionEnum.translate })
  @IsEnum(OptionEnum, { message: 'Option is not exist' })
  option: OptionEnum;

  @ApiProperty({ required: true, default: AiEnum.gpt })
  @IsEnum(AiEnum, { message: 'AI is not exist' })
  ai: AiEnum;
}
