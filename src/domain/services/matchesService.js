import { poolPromise, sql } from "../../infrastructure/databases/mySqlRepository.js";

export const registerMatchService = async (userFrom, userTo) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input("option", sql.VarChar(50), "RegisterMatch")
            .input("UserFrom", sql.Int, userFrom)
            .input("UserTo", sql.Int, userTo)
            .execute("SP_MATCHES");
        const response = result.recordset[0];
        return response;
    } catch (error) {
        console.log(error);
        throw new Error("Ha ocurrido un error inesperado obteniendo la información del usuario");
    }
}
