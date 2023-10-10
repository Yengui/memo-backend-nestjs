import * as mongoose from 'mongoose';

export const Answer = new mongoose.Schema(
  {
    response: { type: String, required: true },
    question: {
      type: mongoose.Types.ObjectId,
      ref: 'Question',
      required: true,
    },
    user: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true },
);

Answer.index({ question: 1, response: 1 }, { unique: true });

export interface AnswerInterface {
  response: string;
  question: string;
  user: string;
  createdAt: Date;
  updatedAt: Date;
}
