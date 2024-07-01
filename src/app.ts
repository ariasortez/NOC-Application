import { MongoDatabase } from './data/mongo';
import { Server } from './presentation/server';

(() => {
  main();
})();

async function main() {
  const mongoUrl = process.env.MONGO_URL;
  await MongoDatabase.connect({
    mongoUrl: mongoUrl,
    dbName: process.env.MONGO_DB_NAME,
  });
  // Server.start();
}
