import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EmployeesService } from 'src/employees/employees.service';
import { EmployeeDocument } from 'src/employees/schema/employee.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';

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
  ) {}

  async create(
    createUserDto: CreateUserDto,
  ): Promise<{ createdUser: UserDocument; createdEmployee: EmployeeDocument }> {
    const createdUser = await new this.userModel(createUserDto).save();

    if (createUserDto.usertype == UserType.Employee) {
      const createEmployeeDto = {
        userId: createdUser._id,
        salary: createUserDto.salary,
        department: createUserDto.department,
        experience: createUserDto.experience,
      };
      const { createdEmployee } = await this.employeesService.create(
        createEmployeeDto,
      );
      return { createdUser, createdEmployee };
    }
  }

  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }

  async findbyId(id: string): Promise<{
    userDocument: UserDocument;
    employeeDocument: EmployeeDocument;
  }> {
    const userData = await this.userModel.findById(id);
    const empData = await this.employeesService.findByUserId(id);

    return { userDocument: userData, employeeDocument: empData };
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
}
