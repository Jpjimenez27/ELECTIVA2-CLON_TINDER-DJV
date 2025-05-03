import { registerMatchService, acceptMatchService } from "../../src/domain/services/matchesService";
import { poolPromise } from "../../src/infrastructure/databases/mySqlRepository"; // Ajusta según la ubicación de la configuración de la BD
import sql from "mssql";

jest.mock("../../src/infrastructure/databases/mySqlRepository", () => ({
    poolPromise: {
        then: jest.fn(),
    },
}));

describe("registerMatchService", () => {
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

    it("debe registrar un match correctamente y retornar la respuesta", async () => {
        const mockResponse = { matchId: 1, status: "success" };
        mockRequest.execute.mockResolvedValueOnce({ recordset: [mockResponse] });

        const result = await registerMatchService("user123", "user456");

        expect(mockRequest.input).toHaveBeenCalledWith("option", sql.VarChar(50), "RegisterMatch");
        expect(mockRequest.input).toHaveBeenCalledWith("UserFrom", sql.Int, "user123");
        expect(mockRequest.input).toHaveBeenCalledWith("UserTo", sql.Int, "user456");
        expect(mockRequest.execute).toHaveBeenCalledWith("SP_MATCHES");
        expect(result).toEqual(mockResponse);
    });

    it("debe manejar errores correctamente y lanzar una excepción", async () => {
        mockRequest.execute.mockRejectedValueOnce(new Error("Error en la base de datos"));

        await expect(registerMatchService("user123", "user456")).rejects.toThrow(
            "Ha ocurrido un error inesperado obteniendo la información del usuario"
        );

        expect(mockRequest.execute).toHaveBeenCalledWith("SP_MATCHES");
    });
});

describe("acceptMatchService", () => {
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

    it("debe aceptar un match correctamente", async () => {
        mockRequest.execute.mockResolvedValueOnce({ recordset: [{}] });

        const result = await acceptMatchService("user123", "user456", 1);

        expect(mockRequest.input).toHaveBeenCalledWith("option", sql.VarChar(50), "AcceptMacth");
        expect(mockRequest.input).toHaveBeenCalledWith("UserFrom", sql.Int, "user456");
        expect(mockRequest.input).toHaveBeenCalledWith("UserTo", sql.Int, "user123");
        expect(mockRequest.input).toHaveBeenCalledWith("IsMatch", sql.TinyInt, 1);
        expect(mockRequest.execute).toHaveBeenCalledWith("SP_MATCHES");
        expect(result).toBe(1);
    });

    it("debe manejar errores correctamente y lanzar una excepción", async () => {
        mockRequest.execute.mockRejectedValueOnce(new Error("Error en la base de datos"));

        await expect(acceptMatchService("user123", "user456", 1)).rejects.toThrow(
            "Ha ocurrido un error inesperado obteniendo la información del usuario"
        );

        expect(mockRequest.execute).toHaveBeenCalledWith("SP_MATCHES");
    });
});