import { uploadBase64ImageToBlob } from "../../infrastructure/blobstorage/blobStorage.js";
import pool from "../../infrastructure/databases/mySqlRepository.js";
import { hashPassword } from "./hashPasswordService.js";
import { generateGuid } from "./randomStringService.js";
import { sendMailActivateAccount } from "./sendMailService.js";

export const registerUserService = async (body) => {
    try {
        const { firstName, middleName, lastName, secondLastName, email, birthDate, gender, country, countryCode, city, height, description, password, hobbies, images } = body;

        const activateUrl = generateGuid();
        const hashedPssword = await hashPassword(password);


        const [result] = await pool.query("CALL SP_RegisterUser(?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
            [firstName, middleName, lastName, secondLastName, email, new Date(birthDate),
                gender, country, countryCode, city, height, description, activateUrl, hashedPssword]);

        const userId = result[0][0].id;

        hobbies.forEach(async hobbie => {

            await pool.query("CALL SP_Register_Hobbbie(?,?)", [userId, hobbie]);
        });

        images.forEach(async image => {
            const imageName = generateGuid();
            await pool.query("CALL SP_Register_Image(?,?,?,?)", [userId, image.type, imageName, image.mainImage]);
            await uploadBase64ImageToBlob(image.data.split(",")[1], "flamematch", `${imageName}.${image.type}`, image.type);
        });

       await sendMailActivateAccount("123");

    } catch (error) {
        throw error;
    }
}