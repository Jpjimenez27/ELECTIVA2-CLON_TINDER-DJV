import  { poolPromise } from "./../../infrastructure/databases/mySqlRepository.js";

export const getHobbies = async (req, resp) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT Id as id, Name as name, Icon as icon from hobbies');
        return resp.status(200).send(result.recordsets[0]);
    } catch (error) {
      return  resp.status(500).send({
            title: "Error",
            description: "Error inesperado",
            type: "error"
        });
    }
};