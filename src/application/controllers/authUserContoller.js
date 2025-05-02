
import { getUserPasswordByEmail, registerUserService, verifyExistsUserService } from '../../domain/services/authUserService.js';
import { validatePassword } from "../../domain/services/hashPasswordService.js";
import { generateToken } from '../../domain/services/jwtConfiguratorService.js';
//import { getLoggedUserInformationService } from '../../domain/services/usersService.js';

export const registerUser = async (req, resp) => {

    try {
        const body = req.body;
        const response = await registerUserService(body);
        return resp.status(201).send({
            title: "Registro exitoso",
            description: "Te has registrado exitosamente, ahora revisa tu correo para activar tu cuenta",
            type: "success"
        });


    } catch (error) {
        console.log(error);
        return resp.status(500).send({
            title: "Error",
            description: "Ha ocurrido un error inesperado reistrando el usuario",
            type: "error"
        });
    }
};

export const verifyExistsUser = async (req, resp) => {
    try {
        const { email } = req.params;
        const response = await verifyExistsUserService(email);
        return resp.status(200).send({ response });
    } catch (error) {
        return resp.status(500).send({
            title: "Error",
            description: "Ha ocurrido un error inesperado",
            type: "error"
        });
    }
}

export const login = async (req, resp) => {
    try {
        const { email, password } = req.body;
        const existsEmailUserResponse = await verifyExistsUserService(email);
        if (existsEmailUserResponse) {
            return resp.status(404).send({
                title: "Error",
                description: "No hay un usuario registrado con ese correo electrónico",
                type: "error"
            });
        }
        const { response, userId } = await getUserPasswordByEmail(email);
        const hashedPassword = response;
        const isValidPassword = await validatePassword(password, hashedPassword);
        if (!isValidPassword) {
            return resp.status(401).send({
                title: "Error",
                description: "La contraseña es incorrecta",
                type: "error"
            });
        }
        const token = generateToken(userId);
        return resp.status(200).send({
            token
        });
    } catch (error) {
        console.log(error);

        return resp.status(500).send({
            title: "Error",
            description: "Ha ocurrido un error inesperado iniciando sesión",
            type: "error"
        });
    }
}