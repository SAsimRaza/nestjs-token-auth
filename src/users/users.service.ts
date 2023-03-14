import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EmployeesService } from 'src/employees/employees.service';
import { StudentsService } from 'src/students/students.service';
import { EmployeeDocument } from 'src/employees/schema/employee.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { StudentDocument } from 'src/students/schema/student.schema';
import { CreateStudentDto } from 'src/students/dto/create-student.dto';
import { CreateEmployeeDto } from 'src/employees/dto/create-employee.dto';

enum UserType {
  Both = 'BOTH',
  Employee = 'EMPLOYEE',
  Student = 'STUDENT',
}

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private employeesService: EmployeesService,
    private studentsService: StudentsService,
  ) {}

  async create(
    createUserDto: CreateUserDto,
  ): Promise<{ createdUser: UserDocument }> {
    const createdUser = await new this.userModel(createUserDto).save();

    if (createUserDto.userType == UserType.Employee) {
      const createEmployeeDto = {
        userId: createdUser._id,
        salary: createUserDto.salary,
        department: createUserDto.department,
        experience: createUserDto.experience,
      };
      const { createdEmployee } = await this.employeesService.create(
        createEmployeeDto,
      );
      return { createdUser };
    } else if (createUserDto.userType == UserType.Student) {
      const createStudentDto = {
        userId: createdUser._id,
        fees: createUserDto.fees,
        program: createUserDto.program,
        specialization: createUserDto.specialization,
      };
      const { createdStudent } = await this.studentsService.create(
        createStudentDto,
      );
      return { createdUser };
    } else {
      throw new BadRequestException('User selected invalid role');
    }
  }

  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }

  async findbyId(id: string): Promise<{
    userDocument: UserDocument;
    employeeDocument: EmployeeDocument;
    studentDocument: StudentDocument;
  }> {
    const userData = await this.userModel.findById(id);
    const empData = await this.employeesService.findByUserId(id);
    const stuData = await this.studentsService.findByUserId(id);
    return {
      userDocument: userData,
      employeeDocument: empData,
      studentDocument: stuData,
    };
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
  }

  async remove(id: string) {
    return this.userModel.findByIdAndDelete(id).exec();
  }

  async findByUsername(username: string): Promise<UserDocument> {
    return this.userModel.findOne({ username }).exec();
  }

  async createNewRole(id: string, createUserDto: CreateUserDto) {
    const { userDocument, employeeDocument, studentDocument } =
      await this.findbyId(id);
    if (createUserDto.userType == UserType.Student) {
      if (studentDocument) {
        throw new BadRequestException('This user already a student');
      } else {
        const obj: CreateStudentDto = {
          userId: id,
          fees: createUserDto.fees,
          program: createUserDto.program,
          specialization: createUserDto.specialization,
        };
        const createdStudent = await this.studentsService.create(obj);
      }
    } else if (createUserDto.userType == UserType.Employee) {
      if (employeeDocument) {
        throw new BadRequestException('This user already a employee');
      } else {
        const obj: CreateEmployeeDto = {
          userId: id,
          experience: createUserDto.experience,
          department: createUserDto.department,
          salary: createUserDto.salary,
        };

        const createdEmployee = await this.employeesService.create(obj);
      }
    } else {
      throw new BadRequestException('User selected invalid role');
    }

    userDocument.userType = 'BOTH';
    await this.update(id, userDocument);
  }
}
