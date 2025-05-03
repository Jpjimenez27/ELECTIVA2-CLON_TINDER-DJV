import { uploadBase64ImageToBlob } from "../../infrastructure/blobstorage/blobStorage.js";
import { poolPromise, sql } from "../../infrastructure/databases/mySqlRepository.js";
import { hashPassword } from "./hashPasswordService.js";
import { generateGuid } from "./randomStringService.js";
import { sendMailActivateAccount } from "./sendMailService.js";

export const registerUserService = async (body) => {
    try {
        const { firstName, middleName, lastName, secondLastName, email, birthDate, gender, country, countryCode, city, height, description, password, hobbies, images } = body;
        const activateUrl = generateGuid();
        const hashedPssword = await hashPassword(password);
        const pool = await poolPromise;

        const result = await pool.request()
            .input("option", sql.VarChar(20), "registerUser")
            .input("fisrtName", sql.VarChar(50), firstName.trim())
            .input("middleName", sql.VarChar(50), middleName.trim())
            .input("lastName", sql.VarChar(50), lastName.trim())
            .input("secondLastName", sql.VarChar(50), secondLastName.trim())
            .input("email", sql.VarChar(100), email.trim())
            .input("birthDate", sql.DateTime, birthDate)
            .input("gender", sql.VarChar(20), gender.trim())
            .input("country", sql.VarChar(20), country.trim())
            .input("countryCode", sql.VarChar(10), countryCode.trim())
            .input("city", sql.VarChar(50), city.trim())
            .input("height", sql.Int, height)
            .input("description", sql.NChar, description.trim())
            .input("password", sql.VarChar(100), hashedPssword)
            .input("urlActivateUser", sql.VarChar(100), activateUrl)
            .execute('SP_USERS');
        const userId = result.recordsets[0][0].UserId;
        hobbies.forEach(async hobbie => {
            await pool.request()
                .input("Option", sql.VarChar(20), "InsertUserHobbie")
                .input("IdHobbie", sql.Int, hobbie)
                .input("IdUser", sql.Int, userId)
                .execute('SP_HOBBIES');
        });

        images.forEach(async image => {
            const imageName = generateGuid();

            await pool.request()
                .input("Option", sql.VarChar(20), "InsertUserImages")
                .input("Url", sql.VarChar(100), imageName)
                .input("Type", sql.VarChar(20), image.type)
                .input("Main", sql.TinyInt, image.mainImage)
                .input("IdUser", sql.TinyInt, userId)
                .execute('SP_IMAGES');
            await uploadBase64ImageToBlob(image.data.split(",")[1], "flamematch", `${imageName}.${image.type}`, image.type);

        });
        await sendMailActivateAccount(`${firstName} ${lastName}`,activateUrl,email);
    } catch (error) {
        console.log(error);
        
        throw error;
    }
}

export const verifyExistsUserService = async (email) => {

    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input("option", sql.VarChar(20), "verifyExistsUser")
            .input("email", sql.VarChar(100), email)
            .execute("SP_USERS");
        const response = result.recordsets[0][0].value;
        return response;
    } catch (error) {
        throw error;
    }
}

export const getUserPasswordByEmail = async (email) => {
    const pool = await poolPromise;
    const result = await pool.request()
        .input("email", sql.VarChar(100), email)
        .input("option", sql.VarChar(50), "GetUserPasswordByEmail")
        .execute("SP_USERS");

    const response = result.recordsets[0][0].password;
    const userId = result.recordsets[0][0].id;
    return { response, userId };
} 