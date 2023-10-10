import * as mongoose from 'mongoose';

export const Question = new mongoose.Schema(
  {
    pack: { type: mongoose.Types.ObjectId, ref: 'Pack', required: true },
    question: { type: String, required: true },
    response: { type: String, required: true },
    suggestions: [String],
  },
  { timestamps: true },
);

Question.index({ pack: 1, question: 1 }, { unique: true });

export interface QuestionInterface {
  pack: string;
  question: string;
  response: string;
  suggestions: string[];
  createdAt: Date;
  updatedAt: Date;
}
