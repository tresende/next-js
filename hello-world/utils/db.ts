import { Db, MongoClient } from 'mongodb';

interface Connection {
  client: MongoClient;
  db: Db;
}

const client = new MongoClient(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default async function connect(): Promise<Connection> {
  if (!client.isConnected()) {
    await client.connect();
  }
  const db = client.db('hello');
  return { client, db };
}
