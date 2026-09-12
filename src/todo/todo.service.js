import {
  countTodos,
  createTodo,
  deleteTodoById,
  findTodoById,
  findTodos,
  updateTodo,
} from "./todo.repository.js";

export const getTodos = async (page, limit, offset) => {
  const [todos, count] = await Promise.all([
    findTodos(limit, offset), // 5 detik
    countTodos(), // 2 detik
  ]);

  const totalItems = count;
  const totalPages = Math.ceil(totalItems / limit);

  // 5detik + 2 detik = 7 detik,
  // findtodos 00:00:00 - 00:00:05,
  // count 00:00:05 - 00:00:07
  // 7

  // findtodos, 00:00:00 - 00:00:05
  // countTodos 00:00:00 - 00:00:02
  // 5

  return {
    data: todos,
    meta: {
      page: page,
      limit: limit,
      total_items: totalItems,
      total_pages: totalPages,
    },
  };
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

export const getTodoByID = async (todoId) => {
  const todo = await findTodoById(todoId);

  return todo;
};

export const putTodoByID = async (todoId, todo) => {
  const existingTodo = await findTodoById(todoId); // {}

  if (!existingTodo) {
    return {
      status: 404,
    };
  }

  const updatedTodo = await updateTodo(todoId, {
    ...todo,
    due_date: new Date(todo.due_date),
    updated_at: new Date(),
  });

  return {
    status: 200,
    data: updatedTodo,
  };
};

export const deleteTodoByID = async (todoId) => {
  const existingTodo = await findTodoById(todoId); // {}

  if (!existingTodo) {
    return {
      status: 404,
    };
  }

  await deleteTodoById(todoId);

  return {
    status: 204,
  };
};
