import { findTodos } from "./todo.repository.js";

export const getTodos = async () => {
  const todos = await findTodos();

  return todos;
};
