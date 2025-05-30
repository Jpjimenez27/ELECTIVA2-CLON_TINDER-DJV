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

        return blockBlobClient.url; 
    } catch (error) {
        console.log(error);
        
    }
}