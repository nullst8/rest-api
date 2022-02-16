"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const pg_1 = __importDefault(require("pg"));
const pool = new pg_1.default.Pool({
    user: "postgres",
    database: "todos",
    host: "localhost",
    port: 5432,
});
module.exports = pool;
//# sourceMappingURL=db.js.map