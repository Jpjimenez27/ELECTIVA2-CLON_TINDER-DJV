
import { getPasswordUserByEmailService, registerUserService, verifyExistsUserService } from '../../domain/services/authUserService.js';
import { validatePassword } from "../../domain/services/hashPasswordService.js";
import { generateToken } from '../../domain/services/jwtConfiguratorService.js';
import { getUserInformationService } from '../../domain/services/usersService.js';

export const registerUser = async (req, resp) => {
    try {
        const body = req.body;

        const response = await registerUserService(body);

        console.log(token);

        resp.status(201).send({
            title: "Registro exitoso",
            lastName: "Te has registrado exitosamente, ahora revisa tu correo para activar tu cuenta",
            type: "success"
        });
    } catch (error) {
        resp.status(500).send({
            title: "Error",
            description: "Ha ocurrido un error inesperado reistrando el usuario",
            type: "error"
        });
    }
};
export const verifyExistsUser = async (req, resp) => {
    try {
        const { email } = req.params;

        const count = await verifyExistsUserService(email);
        return resp.status(200).send({
            count
        });
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
        const count = await verifyExistsUserService(email.trim());
        if (count == 0) {
            return resp.status(404).send({
                title: "Error",
                description: "No hay ningún usuario registrado con este correo",
                type: "error"
            });
        }

        const response = await getPasswordUserByEmailService(email);
        const { id, hashedPassword } = response;
        const validPassword = await validatePassword(password, hashedPassword);
        if (!validPassword) {
            return resp.status(422).send({
                title: "Error",
                description: "La contraseña es incorrecta",
                type: "error"
            });
        }
        const token = generateToken(id);
        console.log(token);
        return resp.status(200).send({
            token: token
        });
    } catch (error) {
        return resp.status(500).send({
            title: "Error",
            description: "Ha ocurrido un error inesperado iniciando sesión",
            type: "error"
        });
    }
}

