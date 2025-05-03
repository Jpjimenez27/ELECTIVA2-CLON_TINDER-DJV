import { generateToken } from "../../src/domain/services/jwtConfiguratorService";
import jwt from "jsonwebtoken";

jest.mock("jwt");

describe("generateToken", () => {
    const mockUserId = 123;

    beforeEach(() => {
        process.env.JWT_SECRET_KEY = "test_secret_key";
    });

    it("it must generate a valid token", () => {
        jwt.sign.mockReturnValueOnce("mocked_token"); 

        const result = generateToken(mockUserId);

        expect(jwt.sign).toHaveBeenCalledWith({ userId: mockUserId }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });
        expect(result).toBe("mocked_token"); 
    });

    it("it must handle errors", () => {
        jwt.sign.mockImplementationOnce(() => {
            throw new Error("Error en generación de token");
        });

        expect(() => generateToken(mockUserId)).toThrow("Error en generación de token");
    });
});