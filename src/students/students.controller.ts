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
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller('students')
@UseFilters(new HttpExceptionFilter())
@ApiTags('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  @ApiOkResponse({ description: 'Student created successfully.' })
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto);
  }

  @Get()
  @ApiOkResponse({ description: 'Students retrieved successfully.' })
  findAll() {
    return this.studentsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Student retrieved successfully.' })
  findOne(@Param('id') id: string) {
    return this.studentsService.findbyId(id);
  }

  @UseGuards(AccessTokenGuard)
  @Patch(':id')
  @ApiOkResponse({ description: 'Student updated successfully.' })
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentsService.update(id, updateStudentDto);
  }

  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  @ApiOkResponse({ description: 'Student removed successfully.' })
  remove(@Param('id') id: string) {
    return this.studentsService.remove(id);
  }
}
