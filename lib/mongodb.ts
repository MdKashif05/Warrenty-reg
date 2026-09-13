import { MongoClient, Db } from "mongodb";
import { attachDatabasePool } from "@vercel/functions";

const uri = process.env.MONGODB_URI || "";
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (!uri) {
  console.warn("⚠️ MONGODB_URI is not set in environment variables");
}

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    try {
      attachDatabasePool(client);
    } catch {
      // attachDatabasePool may only be active in Vercel serverless environment
    }
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  try {
    attachDatabasePool(client);
  } catch {
    // attachDatabasePool may only be active in Vercel serverless environment
  }
  clientPromise = client.connect();
}

export default clientPromise;

/**
 * Helper to get the MongoDB database instance.
 * @param dbName Optional database name (defaults to default DB from connection string or 'thermal_lexum')
 */
export async function getDatabase(dbName: string = "thermal_lexum"): Promise<Db> {
  const connectedClient = await clientPromise;
  return connectedClient.db(dbName);
}
