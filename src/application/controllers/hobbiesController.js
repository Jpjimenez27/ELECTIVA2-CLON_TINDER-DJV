import pool from "./../../infrastructure/databases/mySqlRepository.js";

export const getHobbies = async (req, resp) => {
    try {
        const [rows] = await pool.query("select * from hobbies");    
        console.log(rows);
        resp.status(200).send(rows);
    
    } catch (error) {
        resp.status(500).send({
            title: "Error",
            description: "Error inesperado",
            type: "error"
        });
    }
};