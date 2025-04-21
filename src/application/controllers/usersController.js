import { getUserInformationService } from "../../domain/services/usersService.js";

export const getUserInformation = async (req, resp) => {
    try {
        const { userId } = req;
        const user = await getUserInformationService(userId);

        return resp.status(200).send(
            user
        );

    } catch (error) {
        return resp.status(500).send({
            title: "Error",
            description: "Ha ocurrido un error inesperado obteniendo la infromación del usuario",
            type: "error"
        });
    }
}