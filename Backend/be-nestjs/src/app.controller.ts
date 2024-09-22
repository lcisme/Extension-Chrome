import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('App')
@Controller({
  path: 'app',
  version: '1',
})
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  @Get()
  getNotes() {
    return this.appService.getNotes();
  }

  @Post()
  addNote(@Body() note: { content: string }) {
    return this.appService.addNote(note.content);
  }

  @Delete(':id')
  deleteNote(@Param('id') id: number) {
    return this.appService.deleteNote(id);
  }
}
