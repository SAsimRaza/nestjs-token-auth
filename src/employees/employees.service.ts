import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateStudentDto } from 'src/students/dto/create-student.dto';
import { StudentDocument } from 'src/students/schema/student.schema';
// import { StudentsService } from 'src/students/students.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeesModule } from './employees.module';
import { Employee, EmployeeDocument } from './schema/employee.schema';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectModel(Employee.name) private employeeModel: Model<EmployeeDocument>, // private studentsService: StudentsService,
  ) {}

  async create(
    createEmployeeDto: CreateEmployeeDto,
  ): Promise<{ createdEmployee: EmployeeDocument }> {
    const createdEmployee = await new this.employeeModel(
      createEmployeeDto,
    ).save();
    return { createdEmployee };
  }

  async findAll(): Promise<EmployeesModule[]> {
    return this.employeeModel.find().exec();
  }

  async findbyId(id: string): Promise<EmployeesModule> {
    return this.employeeModel.findById(id);
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeeModel
      .findByIdAndUpdate(id, updateEmployeeDto, { new: true })
      .exec();
  }

  async remove(id: string) {
    return this.employeeModel.findByIdAndDelete(id).exec();
  }

  async findByUserId(userId: string): Promise<EmployeeDocument> {
    return this.employeeModel.findOne({ userId }).exec();
  }

  // async createAsStudent(
  //   id: string,
  //   createStudentDto: CreateStudentDto,
  // ): Promise<{ createdStudent: StudentDocument }> {
  //   const isDataExist = await this.studentsService.findByUserId(id);
  //   if (isDataExist) {
  //     throw new BadRequestException('This user already a student');
  //   }

  //   const createdStudent = await this.studentsService.create(createStudentDto);
  //   return createdStudent;
  // }
}
