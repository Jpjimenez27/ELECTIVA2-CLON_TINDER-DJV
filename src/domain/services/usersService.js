import pool from "../../infrastructure/databases/mySqlRepository.js"

export const getUserInformationService = async (userId) => {

    const [result] = await pool.query("CALL SP_GetUserInformation(?)", userId);
    console.log(result[0][0]);
    const response = result[0][0];
    response.images = await getUserImagesService(userId);
    return response;
}


export const getUserImagesService = async (userId) => {

    const [result] = await pool.query("CALL SP_GetUserImages(?)", userId);
    console.log(result[0]);
    const response = result[0];
    return response;
}