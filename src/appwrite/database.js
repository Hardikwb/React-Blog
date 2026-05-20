import { Account, Client, Databases, Permission, Role } from "appwrite";
import config from "../config/config";
class Database{
    client = new Client();
    databases;
    collections;
    constructor(){
        this.client
            .setProject(config.appwriteProjectId)
            .setEndpoint(config.appwriteURL);
        this.databases = new Databases(this.client)
    }

    async createPost({title,slug,content,featuredImage,status,userId}){
        try{
            const post = await this.databases.createDocument({
                databaseId: config.appwriteDatabaseId,
                collectionId: config.appwriteTableId,
                // documentId: slug,
                documentId: ID.unique(),
                data:{title,content,featuredImage,status,userId},
            })
            console.log(post)
        }
        catch(error){
            console.log("Appwrite service :: createPost  error::",error)
        }
    }
    
    async updatePost(slug,{title,content,featuredImage,status}){
        try{
            const post = await this.databases.updateDocument({
                databaseId: config.appwriteDatabaseId,
                collectionId: config.appwriteTableId,
                documentId: slug,
                data:{title,content,featuredImage,status},
            })
            console.log(post)
        }
        catch(error){
            console.log("Appwrite service :: updatePost  error::",error)
        }
    }

    async deletePost(slug){
        try{
            const result = await this.databases.deleteDocument({
                databaseId: config.appwriteDatabaseId,
                collectionId: config.appwriteTableId,
                documentId: slug,
            })
            console.log(result)
            return true
        }
        catch(error){
            console.log("Appwrite service :: deletePost  error::",error)
            return false
        }
    }
     
    async getPost(slug){
        try{
            const post = await this.databases.getDocument({
                databaseId: config.appwriteDatabaseId,
                collectionId: config.appwriteTableId,
                documentId: slug,
            })
            console.log(post)
            return post;
        }
        catch(error){
            console.log("Appwrite service :: getPost  error::",error)
            return {"error":error};
        }
    }
    

    async getAllPosts(){
        try{
            const posts = await this.databases.listDocuments({
                databaseId: config.appwriteDatabaseId,
                collectionId: config.appwriteTableId,
                queries:[Query.equal("status","active")]
            })
            console.log(posts)
            return posts;
        }
        catch(error){
            console.log("Appwrite service :: createPost  error::",error)
            return {"error":error};
        }
    }




}

const database = new Database()

export default database