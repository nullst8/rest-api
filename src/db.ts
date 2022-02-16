import pg from "pg";

const pool = new pg.Pool({
  user: "postgres",
  database: "todos",
  host: "localhost",
  port: 5432,
});

export = pool;
