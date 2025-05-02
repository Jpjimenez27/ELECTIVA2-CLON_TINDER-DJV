import { getHobbies } from "../../src/application/controllers/hobbiesController";

describe("getHobbies", () => {
    let mockRequest, mockResponse;

    beforeEach(() => {
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };
    });

    it("debe retornar un código 200 con la lista de hobbies", async () => {
        const mockPool = {
            request: jest.fn().mockReturnThis(),
            query: jest.fn().mockResolvedValue({
                recordsets: [[
                    { id: 1, name: "Pintura", icon: "bx bx-palette" },
                    { id: 2, name: "Fotografía", icon: "bx bx-camera" },
                    { id: 3, name: "Leer", icon: "bx bx-book" },
                    { id: 4, name: "Música", icon: "bx bx-music" },
                    { id: 5, name: "Cocinar", icon: "bx bxs-bowl-hot" },
                    { id: 6, name: "Películas", icon: "bx bx-camera-movie" },
                    { id: 7, name: "Gimnasio", icon: "bx bx-dumbbell" },
                    { id: 8, name: "Correr", icon: "bx bx-run" },
                    { id: 9, name: "Ciclismo", icon: "bx bx-cycling" },
                    { id: 10, name: "Videojuegos", icon: "bx bx-joystick" },
                    { id: 11, name: "Ajedrez", icon: "bx bxs-chess" },
                    { id: 12, name: "Viajar", icon: "bx bxs-plane-alt" },
                    { id: 13, name: "Salir de fiesta", icon: "bx bx-party" },
                    { id: 14, name: "Baloncesto", icon: "bx bx-basketball" },
                    { id: 15, name: "Teatro", icon: "bx bx-mask" },
                    { id: 16, name: "Fútbol", icon: "bx bx-football" }
                ]]
            })
        };

        global.poolPromise = Promise.resolve(mockPool);

        await getHobbies(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.send).toHaveBeenCalledWith([
            { id: 1, name: "Pintura", icon: "bx bx-palette" },
            { id: 2, name: "Fotografía", icon: "bx bx-camera" },
            { id: 3, name: "Leer", icon: "bx bx-book" },
            { id: 4, name: "Música", icon: "bx bx-music" },
            { id: 5, name: "Cocinar", icon: "bx bxs-bowl-hot" },
            { id: 6, name: "Películas", icon: "bx bx-camera-movie" },
            { id: 7, name: "Gimnasio", icon: "bx bx-dumbbell" },
            { id: 8, name: "Correr", icon: "bx bx-run" },
            { id: 9, name: "Ciclismo", icon: "bx bx-cycling" },
            { id: 10, name: "Videojuegos", icon: "bx bx-joystick" },
            { id: 11, name: "Ajedrez", icon: "bx bxs-chess" },
            { id: 12, name: "Viajar", icon: "bx bxs-plane-alt" },
            { id: 13, name: "Salir de fiesta", icon: "bx bx-party" },
            { id: 14, name: "Baloncesto", icon: "bx bx-basketball" },
            { id: 15, name: "Teatro", icon: "bx bx-mask" },
            { id: 16, name: "Fútbol", icon: "bx bx-football" }
        ]);
    });
});