import { getLoggedUserInformationService } from "../../domain/services/usersService.js";

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