import { verifyExistsUser } from "../../src/application/controllers/authUserContoller";
import { verifyExistsUserService } from "../../src/domain/services/authUserService";

jest.mock("../../src/domain/services/authUserService");

describe("Verify exists user", () => {
    let mockRequest, mockResponse;

    beforeEach(() => {
        mockRequest = { params: { email: "jpjimenez@tdea.com" } };
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };
    });

    it("debe retornar un código 200 con la respuesta del servicio", async () => {
        verifyExistsUserService.mockResolvedValue({ exists: true });

        await verifyExistsUser(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.send).toHaveBeenCalledWith({ response: { exists: true } });
    });

    it("debe manejar errores y retornar un código 500", async () => {
        verifyExistsUserService.mockRejectedValue(new Error("Error simulado"));

        await verifyExistsUser(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.send).toHaveBeenCalledWith({
            title: "Error",
            description: "Ha ocurrido un error inesperado",
            type: "error"
        });
    });
});