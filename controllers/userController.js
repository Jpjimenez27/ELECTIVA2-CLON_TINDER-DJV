import pool from "../db.js";

export const getUsers = async (req, resp) => {
    const [[rows]] = await pool.execute("SELECT 'diego' as name, 22 as edad");
    resp.status(200).send(rows);

};

