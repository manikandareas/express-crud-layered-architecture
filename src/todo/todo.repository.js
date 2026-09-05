import { eq } from "drizzle-orm";
import db from "../db/index.js";
import { todos } from "../db/schema.js";

export const findTodos = async () => {
  return await db.select().from(todos);
};

export const createTodo = async (todo) => {
  const [rowId] = await db.insert(todos).values(todo).$returningId();
  const createdTodo = await findTodoById(rowId);
  return createdTodo;
};

// throw new Error()
export const findTodoById = async (todoId) => {
  const [row] = await db.select().from(todos).where(eq(todos.id, todoId)); // equal | sama dengan. // [] bukan data satuan
  return row; // object | {}
};
