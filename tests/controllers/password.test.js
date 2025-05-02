import { validatePassword, hashPassword } from "../../src/domain/services/hashPasswordService";
import bcrypt from "bcrypt";

jest.mock("bcrypt");

describe("hashPassword", () => {
    it("debe generar un hash válido para una contraseña", async () => {
        bcrypt.hash.mockResolvedValueOnce("hashed123");

        const result = await hashPassword("contra123");

        expect(bcrypt.hash).toHaveBeenCalledWith("contra123", 10); 
        expect(result).toBe("hashed123");
    });

    it("debe manejar errores correctamente", async () => {
        jest.spyOn(console, "error").mockImplementation(() => {}); 
        bcrypt.hash.mockRejectedValueOnce(new Error("Error en bcrypt"));

        await expect(hashPassword("contra123")).rejects.toThrow("Error en bcrypt");
    });
});

describe("Validate password", () => {
    it("debe retornar true si la contraseña es correcta", async () => {
        bcrypt.compare.mockResolvedValueOnce(true);

        const result = await validatePassword("contra123", "hashed123");

        expect(result).toBe(true);
    });

    it("debe retornar false si la contraseña es incorrecta", async () => {
        bcrypt.compare.mockResolvedValueOnce(false); 

        const result = await validatePassword("wrongPass", "hashed123");

        expect(result).toBe(false);
    });

    it("debe manejar errores correctamente", async () => {
        jest.spyOn(console, "error").mockImplementation(() => {});
        bcrypt.compare.mockRejectedValueOnce(new Error("Error en bcrypt"));

        await expect(validatePassword("contra123", "hashed123")).rejects.toThrow("Error validando la contraseña");
    });
});