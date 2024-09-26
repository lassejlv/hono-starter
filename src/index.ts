import { Hono } from 'hono';
import env from './lib/env';
import log from './lib/log';
import { logger } from 'hono/logger';
import { bearerAuth } from 'hono/bearer-auth';
import user from './routes/users';
import jokes from './routes/jokes';
import db from './drizzle';
import { eq } from 'drizzle-orm';
import { users } from './drizzle/schema/user';
import { RateLimit } from '@rlimit/http';

const app = new Hono();

// Middleware
app.use(logger());
app.use(
   '/api/jokes/*',
   bearerAuth({
      verifyToken: async (token) => {
         const validToken = await db.query.users.findFirst({ where: eq(users.token, token) });
         return token === validToken?.token;
      },
   })
);

// Rate limiting
const rlimit = new RateLimit({
   namespace: 'jokes',
   maximum: 5,
   interval: '60s',
});

app.use('/api/*', async (c, next) => {
   const identifier = c.req.header('x-forwarded-for') || c.req.header('x-real-ip') || 'anon';

   // check if the request is within the limit
   const limit = await rlimit.check(identifier);
   console.info(limit);

   if (!limit.ok) {
      return c.json({ error: 'Rate limit exceeded. Max 20 per minute.' }, 429);
   }

   await next();
});

app.get('/', async (c) => {
   const htmlFile = await Bun.file('src/views/register.html').text();
   return c.html(htmlFile);
});

// Set routes. Add more routes as needed
app.basePath('/api').route('/users', user).route('/jokes', jokes);

const server = Bun.serve({ port: env.PORT, fetch: app.fetch });
log.info(`Server started on http://localhost:${server.port}`);
