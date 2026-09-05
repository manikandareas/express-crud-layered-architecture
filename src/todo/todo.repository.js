import { eq } from "drizzle-orm";
import db from "../db/index.js";
import { todos } from "../db/schema.js";

export const findTodos = async () => {
  return await db.select().from(todos);
};

export const createTodo = async (todo) => {
  const [rowId] = await db.insert(todos).values(todo).$returningId();
  const createdTodo = await getTodoByID(rowId);
  return createdTodo;
};

export const getTodoByID = async (todoId) => {
  return await db.select().from(todos).where(eq(todos.id, todoId)); // equal | sama dengan
};
