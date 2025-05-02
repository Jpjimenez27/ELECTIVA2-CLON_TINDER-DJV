import { poolPromise } from "../../src/infrastructure/databases/mySqlRepository";
import sql from "mssql";

jest.mock("mssql");

describe("poolPromise", () => {
    it("debe conectar exitosamente a SQL Server", async () => {
        const mockPool = { connect: jest.fn().mockResolvedValue("Mocked Pool Connection") };
        sql.ConnectionPool.mockImplementation(() => mockPool); 

        const result = await poolPromise;

        expect(mockPool.connect).toHaveBeenCalled(); 
        expect(result).toBe("Mocked Pool Connection");
    });

    it("debe manejar errores en la conexión", async () => {
        const mockError = new Error("Error de conexión");
        const mockPool = { connect: jest.fn().mockRejectedValue(mockError) };
        sql.ConnectionPool.mockImplementation(() => mockPool); 

        await expect(poolPromise).rejects.toThrow("Error de conexión");
    });
});