import * as mongoose from 'mongoose';

export const Pack = new mongoose.Schema(
  {
    name: { type: String, required: true },
    user: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true },
);

Pack.index({ name: 1, user: 1 }, { unique: true });

export interface PackInterface {
  name: string;
  user: string;
  created: string;
}
