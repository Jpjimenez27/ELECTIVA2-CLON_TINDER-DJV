import { getLoggedUserInformationService } from "../../src/domain/services/usersService";
import { poolPromise } from "../../src/infrastructure/databases/mySqlRepository";
import { getUserImagesService } from "../../src/domain/services/usersService";
import { getHobbiesByUserId } from "../../src/domain/services/usersService";
import sql from "mssql";

jest.mock("../../src/infrastructure/databases/mySqlRepository", () => ({
    poolPromise: {
        then: jest.fn(),
    },
}));

jest.mock("../../src/domain/services/usersService");

describe("getLoggedUserInformationService", () => {
    let mockPool, mockRequest;

    beforeEach(() => {
        mockRequest = {
            input: jest.fn().mockReturnThis(),
            execute: jest.fn(),
        };

        mockPool = {
            request: jest.fn().mockReturnValue(mockRequest),
        };

        poolPromise.then.mockResolvedValue(mockPool);
    });

    it("debe retornar la información del usuario correctamente", async () => {
        const mockResponse = { userId: "user123", name: "Juan", age: 25 };
        mockRequest.execute.mockResolvedValueOnce({ recordset: [mockResponse] });

        getUserImagesService.mockResolvedValueOnce(["image1.jpg", "image2.jpg"]);
        getHobbiesByUserId.mockResolvedValueOnce(["coding", "gaming"]);

        const result = await getLoggedUserInformationService("user123");

        expect(mockRequest.input).toHaveBeenCalledWith("option", sql.VarChar(50), "GetUserInformationById");
        expect(mockRequest.input).toHaveBeenCalledWith("Id", sql.Int, "user123");
        expect(mockRequest.execute).toHaveBeenCalledWith("SP_USERS");

        expect(result).toEqual({
            ...mockResponse,
            images: ["image1.jpg", "image2.jpg"],
            hobbies: ["coding", "gaming"],
        });
    });

    it("debe manejar errores correctamente y lanzar una excepción", async () => {
        mockRequest.execute.mockRejectedValueOnce(new Error("Error en la base de datos"));

        await expect(getLoggedUserInformationService("user123")).rejects.toThrow(
            "Ha ocurrido un error inesperado obteniendo la información del usuario"
        );

        expect(mockRequest.execute).toHaveBeenCalledWith("SP_USERS");
    });
});
