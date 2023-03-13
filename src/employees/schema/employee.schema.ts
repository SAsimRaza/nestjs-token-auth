import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EmployeeDocument = Employee & Document;

@Schema()
export class Employee {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  salary: string;

  @Prop({ required: true })
  department: string;

  @Prop()
  experience: string;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
