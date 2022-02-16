import express from "express";
import pool = require("./db");

const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("<h1>RESTful API</h1>");
});

// create todo
app.post("/todos", async (req, res) => {
  const { description } = req.body;
  const newTodo = await pool.query(
    "insert into todo (description) values ($1) returning *",
    [description]
  );
  res.json(newTodo.rows[0]);
});

// get all todos
app.get("/todos", async (_req, res) => {
  const todos = await pool.query("select * from todo");
  res.json(todos.rows);
});

// get a todo
app.get("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const todo = await pool.query("select * from todo where id = $1", [id]);

  res.json(todo.rows[0]);
});

// update todos
app.put("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;

  await pool.query("update todo set description = $1 where id = $2", [
    description,
    id,
  ]);
  res.json("updated");
});

// delete todo
app.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;
  await pool.query("delete from todo where id = $1", [id]);
  res.json("deleted");
});

app.listen(process.env.PORT || 3000, () => console.log("listening on *:3000"));
