import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ExtensionService } from './extension.service';
import { ExtensionDto } from './dto/extension.dto';

@ApiTags('Extension')
@Controller({
  path: 'extension',
  version: '1',
})
export class ExtensionController {
  constructor(private readonly extensionService: ExtensionService) {}

  @Post()
  requestToGPT(@Body() dto: ExtensionDto) {
    return this.extensionService.requestToAI(dto);
  }
}
