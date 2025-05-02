import { getLoggedUserInformationService, getUserInformationForMatchService } from "../../domain/services/usersService.js";

export const getLoggedUserInformation = async (req, resp) => {
    try {
        const { userId } = req;
        const response = await getLoggedUserInformationService(userId);
        return resp.status(200).send(response);
    } catch (error) {
        return resp.status(500).send({
            title: "Error",
            description: "Ha ocurrido un error inesperado obteniendo la infromación del usuario",
            type: "error"
        });
    }
}

export const getUserInformationForMatch = async (req, resp) => {
    try {
        const { userId } = req;
        const response = await getUserInformationForMatchService(userId);
        return resp.status(200).send(response);
    } catch (error) {
        return resp.status(500).send({
            title: "Error",
            description: "Ha ocurrido un error inesperado obteniendo la infromación del usuario",
            type: "error"
        });
    }
}

export const registerMatch = async (req, resp) => {
    try {
        console.log(req.body);
        return resp.status(200).send({
            title: "Registro exitoso",
            description: "Se ha registrado el match exitosamente",
            type: "success"
        });
    } catch (error) {
        return resp.status(500).send({
            title: "Error",
            description: "Ha ocurrido un error inesperado registrando el match",
            type: "error"
        });
    }
}