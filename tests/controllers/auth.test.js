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

    it("it must return a 200 code service", async () => {
        verifyExistsUserService.mockResolvedValue({ exists: true });

        await verifyExistsUser(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.send).toHaveBeenCalledWith({ response: { exists: true } });
    });

    it("it must handle errors and return 500 code", async () => {
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