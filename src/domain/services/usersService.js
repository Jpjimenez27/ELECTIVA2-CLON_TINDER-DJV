// import pool from "../../infrastructure/databases/mySqlRepository.js"

import { poolPromise, sql } from "../../infrastructure/databases/mySqlRepository.js";

export const getLoggedUserInformationService = async (userId) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input("option", sql.VarChar(50), "GetUserInformationById")
            .input("Id", sql.Int, userId)
            .execute("SP_USERS");
        const response = result.recordset[0];
        response.images= await getUserImagesService(userId);
        return response;
    } catch (error) {
        console.log(error);
        throw new Error("Ha ocurrido un error inesperado obteniendo la información del usuario");

    }


    // const [result] = await pool.query("CALL SP_GetUserInformation(?)", userId);
    // console.log(result[0][0]);
    // const response = result[0][0];
    // response.images = await getUserImagesService(userId);

    // return response;
}


export const getUserImagesService = async (userId) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input("option", sql.VarChar(50), "GetImagesByUserId")
            .input("IdUser", sql.Int, userId)
            .execute("SP_IMAGES");
            console.log(result.recordset);
            const response=result.recordset;
            return response;
    } catch (error) {

    }
    // const [result] = await pool.query("CALL SP_GetUserImages(?)", userId);
    // console.log(result[0]);
    // const response = result[0];

    // return response;
}