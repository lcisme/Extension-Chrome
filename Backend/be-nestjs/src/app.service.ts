import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  private notes = [];

  getNotes() {
    return this.notes;
  }

  addNote(content: string) {
    const newNote = { id: this.notes.length + 1, content };
    this.notes.push(newNote);
    return newNote;
  }

  deleteNote(id: number) {
    this.notes = this.notes.filter((note) => note.id !== id);
    return { success: true };
  }
}
