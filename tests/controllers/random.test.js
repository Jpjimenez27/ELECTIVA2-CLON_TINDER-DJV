import { generateGuid } from "../../src/domain/services/randomStringService";
import { v4 as uuidv4 } from "uuid";

jest.mock("uuid");

describe("Correct id generation", () => {
    it("Must generate a valid UUID", () => {
        uuidv4.mockReturnValueOnce("123e4567-e89b-12d3-a456-426614174000");

        const result = generateGuid();

        expect(uuidv4).toHaveBeenCalled();
        expect(result).toBe("123e4567-e89b-12d3-a456-426614174000");
    });
});