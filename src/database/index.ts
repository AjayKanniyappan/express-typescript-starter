import mongoose from 'mongoose';
import config from '@configs/index';

function getDatabase(dbName: string) {
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName,
  };
  const database = mongoose.createConnection(config.DATABASE_URL, options);
  return database;
}

export default getDatabase;
