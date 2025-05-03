import { getChatsList, registerChat, getMessages } from "../../src/application/controllers/usersController";
import { getChatsListService, regigisterChatService, getMessagesService } from "../../src/domain/services/usersService";

jest.mock("../../src/domain/services/usersService"); // Mock del servicio

describe("getChatsList", () => {
    let req, res;

    beforeEach(() => {
        req = { userId: 28 };

        res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
    });

    it("debe retornar la lista de chats correctamente", async () => {
        const mockResponse = [
            { chatId: "chat1", users: [28, 31] },
            { chatId: "chat2", users: [28, 31] },
        ];
        getChatsListService.mockResolvedValueOnce(mockResponse);

        await getChatsList(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(mockResponse);
    });

    it("debe manejar errores correctamente", async () => {
        getChatsListService.mockRejectedValueOnce(new Error("Error interno"));

        await getChatsList(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({
            title: "Error",
            description: "Ha ocurrido un error inesperado registrando el match",
            type: "error",
        });
    });
});

describe("registerChat", () => {
    let req, res;

    beforeEach(() => {
        req = {
            body: { idMatch: 40, message: "Holamnbgvfd cómo estas" }
        };

        res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
    });

    it("debe registrar un mensaje exitosamente", async () => {
        regigisterChatService.mockResolvedValueOnce();

        await registerChat(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith({
            title: "Registro exitoso",
            description: "Se ha registrado el mensaje exitosamente",
            type: "success",
        });
    });

    it("debe manejar errores correctamente", async () => {
        regigisterChatService.mockRejectedValueOnce(new Error("Error interno"));

        await registerChat(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({
            title: "Error",
            description: "Ha ocurrido un error inesperado registrando el match",
            type: "error",
        });
    });
});

describe("getMessages", () => {
    let req, res;

    beforeEach(() => {
        req = { params: { idMatch: 40 } };

        res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
    });

    it("debe retornar los mensajes correctamente", async () => {
        const mockResponse = [
            { message: "hola bv", userId: 30, date: "2023-10-01T12:00:00Z" },
        ];
        getMessagesService.mockResolvedValueOnce(mockResponse);

        await getMessages(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(mockResponse);
    });

    it("debe manejar errores correctamente", async () => {
        getMessagesService.mockRejectedValueOnce(new Error("Error interno"));

        await getMessages(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({
            title: "Error",
            description: "Ha ocurrido un error obteniendo los mensajes",
            type: "error",
        });
    });
});
