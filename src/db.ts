import pg from "pg";
import * as dotenv from "dotenv";

dotenv.config();

const pool = new pg.Pool({
  user: process.env.USR,
  password: process.env.PASSWORD,
  database: process.env.DB,
  host: process.env.HOST,
  port: 5432,
});

export = pool;
