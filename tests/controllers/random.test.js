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

    it("must generate different values in each execution", () => {
        const guid1 = generateGuid();
        const guid2 = generateGuid();

        expect(typeof guid1).toBe("string");
        expect(typeof guid2).toBe("string");
        expect(guid1).not.toBe(guid2); 
    });
});