import { db } from './config.js'; 
// db.js
// const sql = require('mssql')s;
import sql from 'mssql';

export const poolPromise = new sql.ConnectionPool(db)
  .connect()
  .then(pool => {
    console.log('Conexión a SQL Server exitosa 🚀');
    return pool;
  })
  .catch(err => console.error('Error en conexión a SQL Server:', err));

  export { sql };