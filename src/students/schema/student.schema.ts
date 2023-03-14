import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StudentDocument = Student & Document;

@Schema()
export class Student {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  fees: string;

  @Prop({ required: true })
  program: string;

  @Prop()
  specialization: string;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
