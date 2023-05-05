import mongoose from 'mongoose';
import config from '@configs/index';

const databaseMap: ETS.DatabaseMap = {};

function getDatabase(dbName: string) {
  if (!databaseMap[dbName]) {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName,
    };
    const database = mongoose.createConnection(config.DATABASE_URL, options);
    databaseMap[dbName] = database;
  }
  return databaseMap[dbName];
}

export default getDatabase;
