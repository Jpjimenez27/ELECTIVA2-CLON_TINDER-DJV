import { generateToken } from "../../src/domain/services/jwtConfiguratorService";
import jwt from "jsonwebtoken";

jest.mock("jsonwebtoken");

describe("generateToken", () => {
    const mockUserId = 123;

    beforeEach(() => {
        process.env.JWT_SECRET_KEY = "test_secret_key";
    });

    it("debe generar un token válido", () => {
        jwt.sign.mockReturnValueOnce("mocked_token"); 

        const result = generateToken(mockUserId);

        expect(jwt.sign).toHaveBeenCalledWith({ userId: mockUserId }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });
        expect(result).toBe("mocked_token"); 
    });

    it("debe manejar errores correctamente", () => {
        jwt.sign.mockImplementationOnce(() => {
            throw new Error("Error en generación de token");
        });

        expect(() => generateToken(mockUserId)).toThrow("Error en generación de token");
    });
});