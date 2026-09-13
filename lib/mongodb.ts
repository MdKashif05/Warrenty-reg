import { MongoClient, Db, MongoClientOptions } from "mongodb";
import { attachDatabasePool } from "@vercel/functions";

const FALLBACK_URI =
  "mongodb+srv://Vercel-Admin-atlas-canary-lamp:fnnxOj7PdGmD9ORq@atlas-canary-lamp.pljzza4.mongodb.net/?retryWrites=true&w=majority";

const uri: string =
  process.env.MONGODB_URI?.trim() ||
  process.env.MONGO_URL?.trim() ||
  FALLBACK_URI;

const options: MongoClientOptions = {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 8000,
  connectTimeoutMS: 10000,
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

function getMongoClientPromise(): Promise<MongoClient> {
  if (global._mongoClientPromise) {
    return global._mongoClientPromise;
  }

  client = new MongoClient(uri, options);

  try {
    attachDatabasePool(client);
  } catch (err) {
    // attachDatabasePool may be a no-op outside Vercel production functions
  }

  global._mongoClientPromise = client.connect().catch((err) => {
    // Reset promise cache if connection fails so subsequent requests retry
    global._mongoClientPromise = undefined;
    console.error("❌ MongoDB Atlas connection error:", err);
    throw err;
  });

  return global._mongoClientPromise;
}

clientPromise = getMongoClientPromise();

export default clientPromise;

/**
 * Helper to get the MongoDB database instance with lazy reconnection.
 * @param dbName Optional database name (defaults to 'thermal_lexum')
 */
export async function getDatabase(dbName: string = "thermal_lexum"): Promise<Db> {
  const connectedClient = await getMongoClientPromise();
  return connectedClient.db(dbName);
}
