import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AdminGuard } from 'src/guards/admin.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AdminGuard)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(AdminGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(AdminGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @UseGuards(AdminGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @Post('login')
  login(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    return this.usersService.login(username, password);
  }

  @Post('signup')
  signup(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
