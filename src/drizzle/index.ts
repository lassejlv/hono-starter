import env from '@/lib/env';
import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import schema from './export';

const client = createClient({
   url: env.TURSO_URL,
   authToken: env.TURSO_AUTH_TOKEN,
});

const db = drizzle(client, { schema });

export default db;
