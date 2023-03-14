import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { UsersService } from './users/users.service';
import { EmployeesModule } from './employees/employees.module';
import { StudentsModule } from './students/students.module';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [MongooseModule.forRoot(process.env.API), UsersModule, AuthModule, EmployeesModule, StudentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
