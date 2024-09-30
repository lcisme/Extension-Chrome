import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { OptionEnum } from '../extension.enum';

export class CreateExtensionDto {
  @ApiProperty({ default: 'translate' })
  @IsString()
  option: OptionEnum;

  @ApiProperty({ default: 'string' })
  @IsString()
  promptInstruction: string;
}
