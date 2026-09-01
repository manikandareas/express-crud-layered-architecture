import { int, mysqlTable, text, varchar } from "drizzle-orm/mysql-core";

export const products = mysqlTable("products", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  price: int("price").notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
});
