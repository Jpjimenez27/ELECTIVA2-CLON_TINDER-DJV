import { login } from "../../src/application/controllers/authUserContoller";
import { verifyExistsUserService } from "../../src/domain/services/authUserService";
import { getUserPasswordByEmail } from "../../src/domain/services/authUserService";
import { validatePassword } from "../../src/domain/services/hashPasswordService";
import { generateToken } from "../../src/domain/services/jwtConfiguratorService";

jest.mock("../../src/domain/services/authUserService");
jest.mock("../../src/domain/services/authUserService");
jest.mock("../../src/domain/services/hashPasswordService");
jest.mock("../../src/domain/services/jwtConfiguratorService");

describe("Login Test", () => {
    let mockRequest, mockResponse;

    beforeEach(() => {
        mockRequest = { body: { email: "juanito@tdea.com", password: "contra123" } };
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };
    });

    it("Should return 404 if the user does not exist", async () => {
        verifyExistsUserService.mockResolvedValueOnce(true);

        await login(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.send).toHaveBeenCalledWith({
            title: "Error",
            description: "No hay un usuario registrado con ese correo electrónico",
            type: "error"
        });
    });

    it("Should return 401 if the password is incorrect", async () => {
        verifyExistsUserService.mockResolvedValueOnce(false); 
        getUserPasswordByEmail.mockResolvedValueOnce({ response: "hashedPassword123", userId: 1 });
        validatePassword.mockResolvedValueOnce(false);

        await login(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(401);
        expect(mockResponse.send).toHaveBeenCalledWith({
            title: "Error",
            description: "La contraseña es incorrecta",
            type: "error"
        });
    });

    it("Should return 200 and a token if the login is successful", async () => {
        verifyExistsUserService.mockResolvedValueOnce(false);
        getUserPasswordByEmail.mockResolvedValueOnce({ response: "hashedPassword123", userId: 1 });
        validatePassword.mockResolvedValueOnce(true); 
        generateToken.mockReturnValueOnce("mocked_token");

        await login(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.send).toHaveBeenCalledWith({ token: "mocked_token" });
    });

    it("Must handle errors and return 500", async () => {
        jest.spyOn(global.console, "error").mockImplementation(() => {});
        verifyExistsUserService.mockRejectedValueOnce(new Error("Error simulado"));

        await login(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.send).toHaveBeenCalledWith({
            title: "Error",
            description: "Ha ocurrido un error inesperado iniciando sesión",
            type: "error"
        });
    });
});