import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { StudentsModule } from './students.module';
import { Student, StudentDocument } from './schema/student.schema';

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel(Student.name) private StudentModel: Model<StudentDocument>,
  ) {}

  async create(
    createStudentDto: CreateStudentDto,
  ): Promise<{ createdStudent: StudentDocument }> {
    const createdStudent = await new this.StudentModel(createStudentDto).save();
    return { createdStudent };
  }

  async findAll(): Promise<StudentsModule[]> {
    return this.StudentModel.find().exec();
  }

  async findbyId(id: string): Promise<StudentsModule> {
    return this.StudentModel.findById(id);
  }

  async update(id: string, updateStudentDto: UpdateStudentDto) {
    return this.StudentModel.findByIdAndUpdate(id, updateStudentDto, {
      new: true,
    }).exec();
  }

  async remove(id: string) {
    return this.StudentModel.findByIdAndDelete(id).exec();
  }

  async findByUserId(userId: string): Promise<StudentDocument> {
    return this.StudentModel.findOne({ userId }).exec();
  }
}
