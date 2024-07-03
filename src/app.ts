import { PrismaClient } from '@prisma/client';
import { MongoDatabase } from './data/mongo';
import { Server } from './presentation/server';

(() => {
  main();
})();

async function main() {
  await MongoDatabase.connect({
    mongoUrl: process.env.MONGO_URL,
    dbName: process.env.MONGO_DB_NAME,
  });

  // const logs = await prisma.logModel.findMany();

  // console.log(logs);
  Server.start();
}
