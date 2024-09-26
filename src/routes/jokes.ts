import { Hono } from 'hono';
import jokesJson from '../lib/jokes.json';

const maxLength = 100;

const jokes = new Hono();

jokes.get('/', (c) => {
   const limit = Math.min(parseInt(c.req.query('limit') as string, 10) || 5, maxLength);

   return c.json(jokesJson.slice(0, limit));
});

export default jokes;
