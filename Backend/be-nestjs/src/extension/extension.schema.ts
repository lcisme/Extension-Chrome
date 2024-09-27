import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
@Schema({
  timestamps: true,
})
export class Extension extends Document<Types.ObjectId> {
  @Prop()
  prompt: string;

  @Prop()
  promptInstruction: string;

  @Prop()
  nameModelAi: string;
}

export const ExtensionSchema = SchemaFactory.createForClass(Extension);
