import { Client, Storage, Permission, Role,ID,ImageGravity, ImageFormat } from "appwrite";
import config from "../config/config";
class DataStorage{
    client = new Client();
    bucket;
    constructor(){
        this.client
            .setProject(config.appwriteProjectId)
            .setEndpoint(config.appwriteURL);
        this.bucket = new Storage(this.client)
    }

    async uploadFile(file){
        try {
            const result = await this.bucket.createFile({
                bucketId: config.appwriteBucketId,
                fileId: ID.unique(),
                file: file,
            });
            return result
        } 
        catch(error) {
            console.log("Appwrite :: uploadFile error::",error)
            return false
        }
    }
    
    async deleteFile(fileId){
        try {
            const result = await this.bucket.deleteFile({
                bucketId: config.appwriteBucketId,
                fileId: fileId,
            });
            return true
        } 
        catch(error) {
            console.log("Appwrite :: deleteFile error::",error)
            return false
        }
    }


    async getFile(fileId){
        try {
            const result = await this.bucket.getFile({
                bucketId: config.appwriteBucketId,
                fileId: fileId
            });
        } 
        catch(error) {
            console.log("Appwrite :: getFile error::",error)
        }
    }
    
    
    getFileView(fileId){
        try {
            const result = this.bucket.getFileView({
                bucketId: config.appwriteBucketId,
                fileId: fileId,
            });
            return result.toString()
        } 
        catch(error) {
            console.log("Appwrite :: getFileView error::",error)
            return null
        }
    }
    
}

const StorageService = new DataStorage()

export default StorageService