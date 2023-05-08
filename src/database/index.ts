import mongoose from 'mongoose';
import config from '@configs/index';
import logger from '@middlewares/logger';

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

  return new Promise((resolve, reject) => {
    databaseMap[dbName]
      .asPromise()
      .then(() => {
        resolve(databaseMap[dbName]);
        return null;
      })
      .catch(() => {
        reject(new Error('Database connection error'));
        logger.error(`Error when connecting database`);
      });
  });
}

export default getDatabase;
