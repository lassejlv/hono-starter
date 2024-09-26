import { sql } from 'drizzle-orm';
import crypto from 'crypto';

const generateToken = () => crypto.randomBytes(32).toString('hex');
const generateDate = () => sql`(current_timestamp)`;

export { generateToken, generateDate };
