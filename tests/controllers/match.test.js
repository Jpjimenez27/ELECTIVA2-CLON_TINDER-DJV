import { registerMatch,acceptMatch } from "../../src/application/controllers/usersController";
import { registerMatchService, acceptMatchService } from "../../src/domain/services/matchesService";

jest.mock("../../src/domain/services/matchesService"); // Mock del servicio

describe("registerMatch", () => {
    let req, res;

    beforeEach(() => {
        req = {
            body: { userTo: 28 },};

        res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
    });

    it("debe registrar un match exitosamente", async () => {
        registerMatchService.mockResolvedValueOnce();

        await registerMatch(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith({
            title: "Registro exitoso",
            description: "Se ha registrado el match exitosamente",
            type: "success",
        });
    });

    it("debe manejar errores correctamente", async () => {
        registerMatchService.mockRejectedValueOnce(new Error("Error interno"));

        await registerMatch(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({
            title: "Error",
            description: "Ha ocurrido un error inesperado registrando el match",
            type: "error",
        });
    });
});

describe("acceptMatch", () => {
    let req, res;

    beforeEach(() => {
        req = {
            body: { userTo: 28, isMatch: true } };

        res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
    });

    it("debe actualizar un match exitosamente", async () => {
        acceptMatchService.mockResolvedValueOnce();

        await acceptMatch(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith({
            title: "Registro exitoso",
            description: "Se ha actualizado el match exitosamente",
            type: "success",
        });
    });

    it("debe manejar errores correctamente", async () => {
        acceptMatchService.mockRejectedValueOnce(new Error("Error interno"));

        await acceptMatch(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({
            title: "Error",
            description: "Ha ocurrido un error inesperado registrando el match",
            type: "error",
        });
    });
});