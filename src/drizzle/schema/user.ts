import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { generateDate, generateToken } from '../helper';

export const users = sqliteTable('users', {
   id: integer('id').primaryKey(),
   email: text('email').unique().notNull(),
   token: text('token').notNull().$defaultFn(generateToken),
   createdAt: text('created_at').notNull().$defaultFn(generateDate),
   updatedAt: text('updated_at').notNull().$defaultFn(generateDate).$onUpdate(generateDate),
});

export type SelectUser = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
