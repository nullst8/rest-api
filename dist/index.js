"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pool = require("./db");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/", (_req, res) => {
    res.send("<h1>RESTful API</h1>");
});
app.post("/todos", async (req, res) => {
    const { description } = req.body;
    const newTodo = await pool.query("insert into todo (description) values ($1) returning *", [description]);
    res.json(newTodo.rows[0]);
});
app.get("/todos", async (_req, res) => {
    const todos = await pool.query("select * from todo");
    res.json(todos.rows);
});
app.get("/todos/:id", async (req, res) => {
    const { id } = req.params;
    const todo = await pool.query("select * from todo where id = $1", [id]);
    res.json(todo.rows[0]);
});
app.put("/todos/:id", async (req, res) => {
    const { id } = req.params;
    const { description } = req.body;
    await pool.query("update todo set description = $1 where id = $2", [
        description,
        id,
    ]);
    res.json("updated");
});
app.delete("/todos/:id", async (req, res) => {
    const { id } = req.params;
    await pool.query("delete from todo where id = $1", [id]);
    res.json("deleted");
});
app.listen(process.env.PORT || 3000, () => console.log("listening on *:3000"));
//# sourceMappingURL=index.js.map