import db from "../db/index.js";
import { todos } from "../db/schema.js";

export const findTodos = async () => {
  return db.select().from(todos);
};
