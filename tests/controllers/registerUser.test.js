import { registerUser } from "../../src/application/controllers/authUserContoller";

describe("User register", () => {
    let mockRequest, mockResponse;

    beforeEach(() => {
        mockRequest = { body: { name: "Juan", email: "juan@example.com", password: "securePass123" } }; 
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };
    });

    it("debe retornar un código 201 con mensaje de éxito", async () => {
        await registerUser(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(201);
        expect(mockResponse.send).toHaveBeenCalledWith({
            title: "Registro exitoso",
            description: "Te has registrado exitosamente, ahora revisa tu correo para activar tu cuenta",
            type: "success"
        });
    });

    it("debe manejar errores y retornar un código 500", async () => {
        jest.spyOn(global.console, "error").mockImplementation(() => {}); 
    
        jest.spyOn(global, "registerUser").mockImplementation(async () => {
            throw new Error("Error simulado");
        });
    
        await registerUser(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.send).toHaveBeenCalledWith({
            title: "Error",
            description: "Ha ocurrido un error inesperado registrando el usuario",
            type: "error"
        });
    });    
});