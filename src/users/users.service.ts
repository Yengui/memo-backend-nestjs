import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserInterface } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly User: Model<UserInterface>,
    private jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(createUserDto.password, salt);
    const crypteduser = { ...createUserDto, password: passwordHash };
    const newUser = new this.User(crypteduser);
    const user = await newUser.save();
    return { id: user.id };
  }

  async findAll() {
    const users = await this.User.find();
    return users;
  }

  async findOne(id: string) {
    const user = await this.User.findById(id);
    if (!user) throw new NotFoundException('user not found');
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.User.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    });
    return user;
  }

  async remove(id: string) {
    const user = await this.User.findByIdAndDelete(id);
    if (!user) throw new NotFoundException('user not found');
    return user;
  }

  async login(username: string, password: string) {
    const user = await this.User.findOne({ username });
    if (!user) throw new NotFoundException('user with that username not found');
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      throw new BadRequestException('wrong email or password');
    return {
      access_token: await this.jwtService.signAsync({
        sub: user.id,
        username: user.username,
      }),
    };
  }
}
