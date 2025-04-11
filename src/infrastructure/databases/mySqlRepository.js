import { createPool } from 'mysql2/promise';
import { db } from './config.js'; 

const pool = createPool({
  host: db.host,
  user: db.user,
  password: db.password,
  database: db.database,
});

export default pool;
