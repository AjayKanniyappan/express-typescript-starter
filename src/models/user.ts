import { Schema } from 'mongoose';
import getDatabase from '@database/index';

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const User = getDatabase('myFirstDatabase').model('users', UserSchema);
