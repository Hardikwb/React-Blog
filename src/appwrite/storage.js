import { Client, Storage, Permission, Role,ID,ImageGravity, ImageFormat } from "appwrite";
import config from "../config/config";
class Storage{
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
                // file: document.getElementById('uploader').files[0],
                file: file,
                permissions: [Permission.read(Role.any())]
            });
            console.log(result);
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
            console.log(result)
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
            console.log(result)
        } 
        catch(error) {
            console.log("Appwrite :: getFile error::",error)
        }
    }
    
    
    async getFilePreview(fileId){
        try {
            const result = await this.bucket.getFilePreview({
                bucketId: config.appwriteBucketId,
                fileId: fileId,
                gravity: ImageGravity.Center,
                output: `${fileId}.Jpeg`,
            });
            console.log(result)
        } 
        catch(error) {
            console.log("Appwrite :: getFilePreview error::",error)
        }
    }
    
}

const service = new Storage()

export default service