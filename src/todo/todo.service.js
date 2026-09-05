import { createTodo, findTodos } from "./todo.repository.js";

export const getTodos = async () => {
  const todos = await findTodos();

  return todos;
};

export const postTodo = async (todo) => {
  // username GABOLEH SAMA DENGAN YANG ADA DI DATABASE

  // DB USERNAME: amelaja
  // BODY: amelaja

  // Ada ga di db yang pake title Hesoyam ?
  // kalo ada di database ? throw Error ("Username sudah digunakan")

  const createdTodo = await createTodo(todo);

  if (!createdTodo) {
    throw new Error("Todo tidak berhasil disimpan");
  }

  return createdTodo;
};
