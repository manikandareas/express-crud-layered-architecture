import { count, eq } from "drizzle-orm";
import db from "../db/index.js";
import { todos } from "../db/schema.js";

export const findTodos = async (limit, offset) => {
  return await db.select().from(todos).limit(limit).offset(offset);
};

export const countTodos = async () => {
  const [row] = await db.select({ count: count() }).from(todos);
  return row.count;
};

export const createTodo = async (todo) => {
  const [rowId] = await db.insert(todos).values(todo).$returningId();
  const createdTodo = await findTodoById(rowId);
  return createdTodo;
};

// throw new Error()
export const findTodoById = async (todoId) => {
  const [row] = await db.select().from(todos).where(eq(todos.id, todoId)); // equal | sama dengan. // [] bukan data satuan
  return row; // data dari todo | {}
};

export const updateTodo = async (todoId, todo) => {
  await db
    .update(todos)
    .set({
      title: todo.title,
      description: todo.description,
      due_date: todo.due_date,
      priority: todo.priority,
      is_completed: todo.is_completed,
      updated_at: todo.updated_at,
    })
    .where(eq(todos.id, todoId));

  return await findTodoById(todoId);
};

export const deleteTodoById = async (todoId) => {
  await db.delete(todos).where(eq(todos.id, todoId));
};
