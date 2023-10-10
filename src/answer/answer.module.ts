import { Module } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { AnswerController } from './answer.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Answer } from './entities/answer.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Answer', schema: Answer }])],
  controllers: [AnswerController],
  providers: [AnswerService],
})
export class AnswerModule {}
