import { getLoggedUserInformation, getUserInformationForMatch } from "../../src/application/controllers/usersController";
import { getLoggedUserInformationService, getUserInformationForMatchService } from "../../src/domain/services/usersService";

jest.mock("../../src/domain/services/usersService");

describe("getLoggedUserInformation", () => {
    let mockRequest, mockResponse;

    beforeEach(() => {
        mockRequest = { userId: 123 };
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };
    });

    it("debe retornar código 200 con la información del usuario", async () => {
        const mockUserInfo = {
            id: 123,
            name: "Juan Pérez",
            email: "juan@example.com"
        };

        getLoggedUserInformationService.mockResolvedValue(mockUserInfo);

        await getLoggedUserInformation(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.send).toHaveBeenCalledWith(mockUserInfo);
    });

    it("debe retornar código 500 en caso de error", async () => {
        getLoggedUserInformationService.mockRejectedValue(new Error("Error inesperado"));

        await getLoggedUserInformation(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.send).toHaveBeenCalledWith({
            title: "Error",
            description: "Ha ocurrido un error inesperado obteniendo la infromación del usuario",
            type: "error"
        });
    });
});

describe("getUserInformationForMatch", () => {
    let mockRequest, mockResponse;

    beforeEach(() => {
        mockRequest = { userId: 123 };
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };
    });

    it("debe retornar código 200 con la información del usuario", async () => {
        const mockUserInfo = {
            id: 123,
            name: "Juan Pérez",
            age: 30,
            hobbies: ["Fútbol", "Videojuegos"]
        };

        getUserInformationForMatchService.mockResolvedValue(mockUserInfo);

        await getUserInformationForMatch(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.send).toHaveBeenCalledWith(mockUserInfo);
    });

    it("debe retornar código 500 en caso de error", async () => {
        getUserInformationForMatchService.mockRejectedValue(new Error("Error inesperado"));

        await getUserInformationForMatch(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.send).toHaveBeenCalledWith({
            title: "Error",
            description: "Ha ocurrido un error inesperado obteniendo la infromación del usuario",
            type: "error"
        });
    });
});