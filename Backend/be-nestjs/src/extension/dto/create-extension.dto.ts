import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateExtensionDto {
  @ApiProperty({ default: 'string' })
  @IsString()
  prompt: string;

  @ApiProperty({ default: 'string' })
  @IsString()
  promptInstruction: string;

  @ApiProperty({ default: 'string' })
  @IsString()
  nameModelAi: string;
}
