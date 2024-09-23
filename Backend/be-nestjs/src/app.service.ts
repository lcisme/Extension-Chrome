import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  private notes = [
    { id: 1, content: '1' },
    { id: 2, content: '2' },
  ];

  getNotes() {
    return this.notes;
  }

  addNote(content: string) {
    const newNote = { id: this.notes.length + 1, content };
    this.notes.push(newNote);
    return newNote;
  }

  deleteNote(id: number) {
    const initialLength = this.notes.length;
    this.notes = this.notes.filter((note) => note.id == Number(id));

    if (this.notes.length < initialLength) {
      return { success: true, message: `Note with id ${id} deleted.` };
    } else {
      return { success: false, message: `Note with id ${id} not found.` };
    }
  }
}
