import mongoose from 'mongoose';
import { seedInitialDatabaseIfEmpty } from './seed';

let isConnected = false;
let connectionPromise: Promise<typeof mongoose> | null = null;

export async function connectToDatabase(): Promise<boolean> {
  const connectionString = process.env.MONGODB_CONNECTION_STRING;

  if (!connectionString) {
    console.log('[MongoDB] MONGODB_CONNECTION_STRING environment variable not defined. Operating with active fallback persistence.');
    return false;
  }

  if (isConnected) {
    return true;
  }

  if (connectionPromise) {
    await connectionPromise;
    return isConnected;
  }

  try {
    console.log('[MongoDB] Connecting to MongoDB instance via MONGODB_CONNECTION_STRING...');

    // Determine database name: use URI pathname if present, otherwise default to 'SilentShield'
    let defaultDbName = process.env.MONGODB_DB_NAME || 'SilentShield';
    try {
      const parsed = new URL(connectionString.replace('mongodb+srv://', 'http://').replace('mongodb://', 'http://'));
      const pathname = parsed.pathname.replace(/^\//, '').trim();
      if (pathname && pathname.length > 0) {
        defaultDbName = pathname;
      }
    } catch {
      // Use fallback default
    }

    connectionPromise = mongoose.connect(connectionString, {
      dbName: defaultDbName,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    await connectionPromise;
    isConnected = true;
    console.log('[MongoDB] Successfully connected to MongoDB database.');

    // Automatically ensure collections are seeded if fresh
    await seedInitialDatabaseIfEmpty();

    mongoose.connection.on('disconnected', () => {
      console.warn('[MongoDB] MongoDB disconnected.');
      isConnected = false;
    });

    mongoose.connection.on('reconnected', () => {
      console.log('[MongoDB] MongoDB reconnected.');
      isConnected = true;
    });

    mongoose.connection.on('error', (err) => {
      console.error('[MongoDB Error]', err);
    });

    return true;
  } catch (error) {
    console.error('[MongoDB Connection Failed]', error);
    isConnected = false;
    connectionPromise = null;
    return false;
  }
}

export function isMongoConnected(): boolean {
  return isConnected && mongoose.connection.readyState === 1;
}
