import pool from "../db.js";

export const getUsers = async (req, resp) => {
    try {
        const [[rows]] = await pool.execute("SELECT 'diego' as name, 22 as age");
        resp.status(200).send(rows);
    } catch (error) {
        resp.status(500).send({
            title: "error",
            description: "Error inesperado",
            type: "error"
        });
    }
};

