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
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';

@Controller('users')
@UseFilters(new HttpExceptionFilter())
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOkResponse({ description: 'User created successfully.' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOkResponse({ description: 'Users retrieved successfully.' })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'User retrieved successfully.' })
  findOne(@Param('id') id: string) {
    return this.usersService.findbyId(id);
  }

  @UseGuards(AccessTokenGuard)
  @Patch(':id')
  @ApiOkResponse({ description: 'User updated successfully.' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  @ApiOkResponse({ description: 'User removed successfully.' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @UseGuards(AccessTokenGuard)
  @Post('newRole/:id')
  @ApiOkResponse({ description: 'New role added successfully.' })
  createNewRole(@Param('id') id: string, @Body() createUserDto: CreateUserDto) {
    return this.usersService.createNewRole(id, createUserDto);
  }
}
