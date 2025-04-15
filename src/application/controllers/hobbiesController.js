import pool from "./../../infrastructure/databases/mySqlRepository.js";

export const getHobbies = async (req, resp) => {
    try {
        const [rows] = await pool.query("CALL SP_GetHobbies();");       
        resp.status(200).send(rows[0]);
    
    } catch (error) {
        console.log(error);
        
        resp.status(500).send({
            title: "Error",
            description: "Error inesperado",
            type: "error"
        });
    }
};