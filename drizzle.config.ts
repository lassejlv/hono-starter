import env from '@/lib/env';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
   schema: 'src/drizzle/schema/**/*.ts',
   out: 'src/drizzle/migrations',
   dialect: 'sqlite',
   driver: 'turso',
   dbCredentials: { url: env.TURSO_URL, authToken: env.TURSO_AUTH_TOKEN },
   verbose: true,
   strict: true,
});
