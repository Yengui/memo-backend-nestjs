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

export interface QuestionInterface {
  name: string;
  user: string;
  created: string;
}
