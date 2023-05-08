import mongoose, { Schema } from 'mongoose';
import getDatabase from '@database/index';
import logger from '@middlewares/logger';

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

/**
 * This Model is an example
 * Configure what you want
 */
async function userModel(dbName: string, model: string) {
  try {
    const database = (await getDatabase(dbName)) as mongoose.Connection;
    return database.model(model, UserSchema);
  } catch (error) {
    logger.error(error);
  }
}

export default userModel;
