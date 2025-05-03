import { acceptMatchService, registerMatchService } from "../../domain/services/matchesService.js";
import { getChatsListService, getLoggedUserInformationService, getMessagesService, getUserInformationForMatchService, regigisterChatService } from "../../domain/services/usersService.js";

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

        const { userTo } = req.body;
        const { userId } = req;
        await registerMatchService(userId, userTo);
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


export const acceptMatch = async (req, resp) => {
    try {

        const { userTo, isMatch } = req.body;

        const { userId } = req;
        await acceptMatchService(userId, userTo, isMatch);
        return resp.status(200).send({
            title: "Registro exitoso",
            description: "Se ha actualizado el match exitosamente",
            type: "success"
        });
    } catch (error) {
        console.log(error);

        return resp.status(500).send({
            title: "Error",
            description: "Ha ocurrido un error inesperado registrando el match",
            type: "error"
        });
    }
}

export const getChatsList = async (req, resp) => {
    try {
        const { userId } = req;
        const response = await getChatsListService(userId);
        return resp.status(200).send(response);
    } catch (error) {
        console.log(error);

        return resp.status(500).send({
            title: "Error",
            description: "Ha ocurrido un error inesperado registrando el match",
            type: "error"
        });
    }
}

export const registerChat = async (req, resp) => {
    try {
        const { userId } = req;
        const {idMatch,message}=req.body;
        await regigisterChatService(userId,idMatch,message);
        return resp.status(200).send({
            title: "Registro exitoso",
            description: "Se ha registrado el mensaje exitosamente",
            type: "success"
        });
    } catch (error) {
        console.log(error);

        return resp.status(500).send({
            title: "Error",
            description: "Ha ocurrido un error inesperado registrando el match",
            type: "error"
        });
    }
}

export const getMessages = async (req, resp) => {
    try {    
        const { idMatch } = req.params;
      const response=  await getMessagesService(idMatch);
        return resp.status(200).send(response);
    } catch (error) {
        console.log(error);

        return resp.status(500).send({
            title: "Error",
            description: "Ha ocurrido un error obteniendo los mensajes",
            type: "error"
        });
    }
}