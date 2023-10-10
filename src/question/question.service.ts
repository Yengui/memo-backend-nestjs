import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { QuestionInterface } from './entities/question.entity';

@Injectable()
export class QuestionService {
  constructor(
    @InjectModel('Question')
    private readonly Question: Model<QuestionInterface>,
  ) {}

  async create(createQuestionDto: CreateQuestionDto, user: string) {
    const newQuestion = new this.Question({ ...createQuestionDto, user });
    const pack = await newQuestion.save();
    return pack;
  }

  async findAll() {
    return await this.Question.find();
  }

  async findOne(id: string) {
    return await this.Question.findById(id);
  }

  async update(id: string, updateQuestionDto: UpdateQuestionDto) {
    return await this.Question.findByIdAndUpdate(
      id,
      { ...updateQuestionDto },
      { new: true },
    );
  }

  async remove(id: string) {
    return await this.Question.findByIdAndDelete(id);
  }
}
