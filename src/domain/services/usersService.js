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
        response.images = await getUserImagesService(userId);
        response.hobbies=await getHobbiesByUserId(userId);
        return response;
    } catch (error) {
        console.log(error);
        throw new Error("Ha ocurrido un error inesperado obteniendo la información del usuario");
    }
}


export const getUserImagesService = async (userId) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input("option", sql.VarChar(50), "GetImagesByUserId")
            .input("IdUser", sql.Int, userId)
            .execute("SP_IMAGES");
        const response = result.recordset;
        return response;
    } catch (error) {
        throw new Error("Error inesperado");

    }

}

export const getUserInformationForMatchService = async (userId) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input("option", sql.VarChar(50), "GetUserInformationForMatch")
            .input("Id", sql.Int, userId)
            .execute("SP_USERS");
        const response = result.recordset[0];
        console.log(response);
        const idUserMatch=result.recordset[0].id;
        response.images = await getUserImagesService(idUserMatch);
        response.hobbies=await getHobbiesByUserId(idUserMatch);
        return response;
    } catch (error) {
        console.log(error);
        throw new Error("Ha ocurrido un error inesperado obteniendo la información del usuario");
    }
}

export const getHobbiesByUserId = async (userId) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input("option", sql.VarChar(50), "GetUserHobbies")
            .input("IdUser", sql.Int, userId)
            .execute("SP_HOBBIES");
        const response = result.recordset;        
        return response;
    } catch (error) {
        console.log(error);
        throw new Error("Ha ocurrido un error inesperado obteniendo la información del usuario");
    }
}