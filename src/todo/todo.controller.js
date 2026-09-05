import express from "express";
import {
  getTodoByID,
  getTodos,
  postTodo,
  putTodoByID,
} from "./todo.service.js";

const router = express.Router();

// /todos
router.get("/", async (req, res) => {
  const todos = await getTodos();

  return res.status(200).send({
    success: true,
    message: "Daftar todo berhasil diambil",
    data: todos,
  });
});

router.post("/", async (req, res) => {
  const todo = req.body;

  if (!todo.title || todo.title?.length < 3) {
    return res.status(403).send({
      success: false,
      message: "Validasi input gagal",
      errors: [
        {
          field: "title",
          message: "Field 'title' wajib diisi dan lebih dari 3 karakter",
        },
      ],
    });
  }

  if (req.body.description?.length > 255) {
    return res.status(403).send({
      success: false,
      message: "Validasi input gagal",
      errors: [
        {
          field: "description",
          message: "Field 'description' tidak boleh lebih dari 255 karakter",
        },
      ],
    });
  }

  const due_date = req.body.due_date ? new Date(req.body.due_date) : null;
  const now = new Date();

  if (due_date?.getTime() < now.getTime()) {
    return res.status(403).send({
      success: false,
      message: "Validasi input gagal",
      errors: [
        {
          field: "due_date",
          message: "Field 'due_date' minimal harus lebih dari waktu saat ini",
        },
      ],
    });
  }

  try {
    const createdTodo = await postTodo(todo);

    return res.status(201).send({
      success: true,
      message: "Todo berhasil dibuat",
      data: createdTodo,
    });
  } catch (error) {
    return res.status(505).send({
      success: false,
      message: error.message, // "Todo tidak berhasil disimpan
      errors: [
        {
          field: "description",
          message: "Field 'description' tidak boleh lebih dari 255 karakter",
        },
      ],
    });
  }
});

// /todos/:id
// /todos/123
// /todos/1234
router.get("/:id", async (req, res) => {
  const todoId = req.params.id;

  try {
    const todo = await getTodoByID(todoId);
    if (!todo) {
      // !todo | ![] | true
      return res.status(404).send({
        success: false,
        message: "Todo dengan ID tersebut tidak ditemukan",
        errors: [],
      });
    }

    return res.status(200).send({
      success: true,
      message: "Detail todo berhasil ditemukan",
      data: todo,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
      errors: [],
    });
  }
});

router.put("/:id", async (req, res) => {
  const todo = req.body;
  const todoId = req.params.id;

  if (
    !(
      todo.title &&
      todo.description &&
      todo.due_date &&
      todo.priority &&
      todo.is_completed
    )
  ) {
    return res.status(400).send("Some fields are missing");
  }

  try {
    const updatedTodo = await putTodoByID(todoId, todo);
    return res.status(200).send({
      success: true,
      message: "Todo berhasil di update",
      data: updatedTodo,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
      errors: [],
    });
  }
});

// SELESSAIKAN UPDATE UNTUK PATCH SAMAKAN AJA KAYAK PUT
router.patch("/:id", (req, res) => {
  return res.send("TOGGLE STATUS TODO");
});

// TUGASNYA MENGHAPUS TODO BERDASARKAN ID, HARUS CEK DULU TODO BERDASARKAN ID ADA ATAU TIDAK BARU DIHAPUS
router.delete("/:id", (req, res) => {
  // ADA KONDISI ID YANG DIKASIH ITU GADA DI DATABASE

  // KAMU HARUS CEK DULU DI DATABASE DATA NYA ADA ATAU GA

  // KALAU ADA ? LANJUTKAN OPERASI DELETE KE DATABASE

  // KALAU GADA ? RETURN DENGAN STATUS 404 KARENA DATA NOT FOUND

  return res.send("TODO DELETED");
});

export default router;
