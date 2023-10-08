import * as mongoose from 'mongoose';

export const User = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    first_name: { type: String, required: true },
    second_name: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true },
);

export interface UserInterface {
  username: string;
  email: string;
  first_name: string;
  second_name: string;
  password: string;
}
