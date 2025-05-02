import { BlobServiceClient } from '@azure/storage-blob';

const key = "DefaultEndpointsProtocol=https;AccountName=flamematch;AccountKey=VFZu3YbDW4Wq2KTAWMEONSDuPE3zWmFhn71iMJsYNJUFqYBbFdlB8c5uNGFBtnSWsesErdmqFurh+AStnYz/Jg==;EndpointSuffix=core.windows.net";
const blobServiceClient = BlobServiceClient.fromConnectionString(key);

export const uploadBase64ImageToBlob = async (base64Image, containerName, blobName,type) => {
    try {
        const buffer = Buffer.from(base64Image, 'base64');    
        const containerClient = blobServiceClient.getContainerClient(containerName);
        await containerClient.createIfNotExists({ access: 'container' });
        

        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    

        await blockBlobClient.uploadData(buffer, {
            blobHTTPHeaders: { blobContentType: "image/"+type },
        });
    
        console.log(`Imagen subida como: ${blobName}`);
        return blockBlobClient.url; 
    } catch (error) {
        console.log(error);
        
    }
}

export function socketErrorHandler(callback) {
    return async (...args) => {
      const socket = args[args.length - 1]; // el último argumento debería ser el socket o tener acceso a él
      try {
        await callback(...args);
      } catch (err) {
        console.error("Error en socket event:", err);
        socket.emit("error_message", {
          message: err.message || "Error interno del servidor.",
        });
      }
    };
  }