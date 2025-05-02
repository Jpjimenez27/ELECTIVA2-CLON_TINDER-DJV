import { uploadBase64ImageToBlob } from "../../src/infrastructure/blobstorage/blobStorage";
import { BlobServiceClient } from "@azure/storage-blob";

jest.mock("@azure/storage-blob"); 

describe("uploadBase64ImageToBlob", () => {
    let mockContainerClient, mockBlockBlobClient;

    beforeEach(() => {
        mockContainerClient = {
            createIfNotExists: jest.fn().mockResolvedValue(),
            getBlockBlobClient: jest.fn()
        };
        mockBlockBlobClient = {
            uploadData: jest.fn().mockResolvedValue(),
            url: "https://fakeazure.blob.core.windows.net/container/blob.jpg"
        };

        jest.spyOn(BlobServiceClient, "fromConnectionString").mockReturnValue({
            getContainerClient: jest.fn().mockReturnValue(mockContainerClient)
        });

        mockContainerClient.getBlockBlobClient.mockReturnValue(mockBlockBlobClient);
    });

    it("debe subir una imagen y devolver la URL", async () => {
        const url = await uploadBase64ImageToBlob("fakeBase64Data", "testContainer", "testBlob", "jpg");

        expect(mockContainerClient.createIfNotExists).toHaveBeenCalled();
        expect(mockBlockBlobClient.uploadData).toHaveBeenCalled();
        expect(url).toBe("https://fakeazure.blob.core.windows.net/container/blob.jpg");
    });

    it("debe manejar errores correctamente", async () => {
        mockBlockBlobClient.uploadData.mockRejectedValue(new Error("Error de Azure"));

        await expect(uploadBase64ImageToBlob("fakeBase64Data", "testContainer", "testBlob", "jpg"))
            .rejects.toThrow("Error de Azure");
    });
});