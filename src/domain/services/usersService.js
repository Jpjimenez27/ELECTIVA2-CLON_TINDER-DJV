import { poolPromise, sql } from "../../infrastructure/databases/mySqlRepository.js";

export const getLoggedUserInformationService = async (userId) => {
    try {
        const pool = await poolPromise;

        const [userResult, images, hobbies] = await Promise.all([
            pool.request()
                .input("option", sql.VarChar(50), "GetUserInformationById")
                .input("Id", sql.Int, userId)
                .execute("SP_USERS"),
            getUserImagesService(userId),
            getHobbiesByUserId(userId)
        ]);

        const response = userResult.recordset[0];
        response.images = images;
        response.hobbies = hobbies;

        return response;
    } catch (error) {
        console.log(error);
        throw new Error("Ha ocurrido un error inesperado obteniendo la información del usuario");
    }
};



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
        if (!response) {
            return null;
        }

        const idUserMatch = response.id;

        // Ejecutar en paralelo
        const [images, hobbies] = await Promise.all([
            getUserImagesService(idUserMatch),
            getHobbiesByUserId(idUserMatch)
        ]);

        response.images = images;
        response.hobbies = hobbies;

        return response;
    } catch (error) {
        console.error(error);
        throw new Error("Ha ocurrido un error inesperado obteniendo la información del usuario");
    }
};


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

export const regigisterChatService = async (userId, idMatch, message) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input("option", sql.VarChar(50), "RegisterMessage")
            .input("Id", sql.Int, userId)
            .input("Message", sql.NChar(250), message)
            .input("IdMatch", sql.Int, idMatch)
            .execute("SP_USERS");
        const response = result.recordset;
        return response;
    } catch (error) {
        console.log(error);
        throw new Error("Ha ocurrido un error inesperado obteniendo la información del usuario");
    }
}


export const getChatsListService = async (userId) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input("option", sql.VarChar(50), "GetUserChats")
            .input("Id", sql.Int, userId)
            .execute("SP_USERS");
        const response = result.recordset;

        for await (const element of response) {
            element.images = await getUserImagesService(element.id);
        }
        return response;
    } catch (error) {
        console.log(error);
        throw new Error("Ha ocurrido un error inesperado obteniendo la información del usuario");
    }
}

export const getMessagesService = async (matchId) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input("option", sql.VarChar(50), "GetMessages")
            .input("IdMatch", sql.Int, matchId)
            .execute("SP_USERS");
        const response = result.recordset;
        return response;
    } catch (error) {
        console.log(error);
        throw new Error("Ha ocurrido un error inesperado obteniendo la información del usuario");
    }
}

export const getUserInformationForMatchServiceFiler = async (userId, country, city) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input("option", sql.VarChar(50), "GetUserInformationForMatchFilter")
            .input("Id", sql.Int, userId)
            .input("city", sql.VarChar(50), city)
            .input("country", sql.VarChar(50), country)
            .execute("SP_USERS");

        const response = result.recordset[0];
        if (!response) {
            return null;
        }

        const idUserMatch = response.id;

        // Ejecutar en paralelo
        const [images, hobbies] = await Promise.all([
            getUserImagesService(idUserMatch),
            getHobbiesByUserId(idUserMatch)
        ]);

        response.images = images;
        response.hobbies = hobbies;

        return response;
    } catch (error) {
        console.error(error);
        throw new Error("Ha ocurrido un error inesperado obteniendo la información del usuario");
    }
};