import { uploadBase64ImageToBlob } from "../../infrastructure/blobstorage/blobStorage.js";
import { registerUserService } from '../../domain/services/authUserService.js';

export const registerUser = async (req, resp) => {
    try {
        const body = req.body;
 
       const response = await registerUserService(body);
        resp.status(201).send({
            title: "Registro exitoso",
            lastName: "Te has registrado exitosamente, ahora revisa tu correo para activar tu cuenta",
            type:"success"
        });
    } catch (error) {
        resp.status(500).send({
            title: "Error",
            description: "Error inesperado",
            type: "error"
        });
    }
};

