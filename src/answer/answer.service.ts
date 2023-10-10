import { Injectable } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AnswerInterface } from './entities/answer.entity';

@Injectable()
export class AnswerService {
  constructor(
    @InjectModel('Answer') private readonly Answer: Model<AnswerInterface>,
  ) {}

  async create(createAnswerDto: CreateAnswerDto, user: string) {
    const newAnswer = new this.Answer({ ...createAnswerDto, user });
    const pack = await newAnswer.save();
    return pack;
  }

  async findAll() {
    return await this.Answer.find();
  }

  async findOne(id: string) {
    return await this.Answer.findById(id);
  }

  async update(id: string, updateAnswerDto: UpdateAnswerDto) {
    return await this.Answer.findByIdAndUpdate(
      id,
      { ...updateAnswerDto },
      { new: true },
    );
  }

  async remove(id: string) {
    return await this.Answer.findByIdAndDelete(id);
  }
}
