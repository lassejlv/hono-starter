import db from '@/drizzle';
import { users } from '@/drizzle/schema/user';
import { zValidator } from '@hono/zod-validator';
import { eq } from 'drizzle-orm';
import { Hono } from 'hono';
import { z } from 'zod';

const schema = z.object({
   email: z.string().email(),
});

const user = new Hono();

user.post('/register', zValidator('form', schema), async (c) => {
   try {
      const { email } = c.req.valid('form');

      const user = await db.query.users.findFirst({ where: eq(users.email, email) });
      if (user) throw new Error('User already exists');

      const newUser = await db.insert(users).values({ email }).returning({ token: users.token });

      return c.json(newUser);
   } catch (error: any) {
      return c.json({ error: error.message }, 400);
   }
});

export default user;
