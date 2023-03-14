import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseFilters,
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';

@Controller('employees')
@UseFilters(new HttpExceptionFilter())
@ApiTags('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  @ApiOkResponse({ description: 'User created successfully.' })
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeesService.create(createEmployeeDto);
  }

  @Get()
  @ApiOkResponse({ description: 'Students retrieved successfully.' })
  findAll() {
    return this.employeesService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Student retrieved successfully.' })
  findOne(@Param('id') id: string) {
    return this.employeesService.findbyId(id);
  }

  @UseGuards(AccessTokenGuard)
  @Patch(':id')
  @ApiOkResponse({ description: 'Student updated successfully.' })
  update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return this.employeesService.update(id, updateEmployeeDto);
  }

  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  @ApiOkResponse({ description: 'New role added successfully.' })
  remove(@Param('id') id: string) {
    return this.employeesService.remove(id);
  }
}
