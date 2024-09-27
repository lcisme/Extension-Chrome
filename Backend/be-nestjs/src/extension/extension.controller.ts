import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ExtensionService } from './extension.service';
import { ExtensionDto } from './dto/extension.dto';
import { CreateExtensionDto } from './dto/create-extension.dto';

@ApiTags('Extension')
@Controller({
  path: 'extension',
  version: '1',
})
export class ExtensionController {
  constructor(private readonly extensionService: ExtensionService) {}

  @Post('/create')
  async create(@Body() dto: CreateExtensionDto) {
    return await this.extensionService.create(dto);
  }

  @Post()
  async requestToGPT(@Body() dto: ExtensionDto) {
    return await this.extensionService.requestToAI(dto);
  }
}
