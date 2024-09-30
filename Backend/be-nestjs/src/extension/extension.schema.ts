import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
@Schema({
  timestamps: true,
})
export class Extension extends Document<Types.ObjectId> {
  @Prop()
  option: string;

  @Prop()
  promptInstruction: string;
}

export const ExtensionSchema = SchemaFactory.createForClass(Extension);
