import {
  boolean,
  int,
  mysqlEnum,
  mysqlTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";
import { createId } from "@paralleldrive/cuid2";

export const products = mysqlTable("products", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  price: int("price").notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
});
// todo dengan id 2
export const todos = mysqlTable("todos", {
  id: varchar({ length: 128 }).$defaultFn(() => createId()), // UUID
  title: varchar({ length: 255 }),
  description: varchar({ length: 255 }),
  is_completed: boolean().default(false),
  priority: mysqlEnum(["easy", "medium", "hard"]).default("easy"), // ENUM
  due_date: timestamp(),
  created_at: timestamp().notNull().defaultNow(),
  updated_at: timestamp().notNull().defaultNow(),
});
