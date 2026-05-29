import { Account, Client, Databases, ID, Permission, Query, Role } from "appwrite";
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
                documentId: ID.unique(),
                data:{title,slug,content,featuredImage,status,userId},
            })
            return post;
        }
        catch(error){
            console.log("Appwrite service :: createPost  error::",error)
            throw error;
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
            return post;
        }
        catch(error){
            console.log("Appwrite service :: updatePost  error::",error)
            throw error;
        }
    }

    async deletePost(slug){
        try{
            const result = await this.databases.deleteDocument({
                databaseId: config.appwriteDatabaseId,
                collectionId: config.appwriteTableId,
                documentId: slug,
            })
            return true
        }
        catch(error){
            console.log("Appwrite service :: deletePost  error::",error)
            throw error;
        }
    }
     
    async getPost(slug){
        try{
            const post = await this.databases.getDocument({
                databaseId: config.appwriteDatabaseId,
                collectionId: config.appwriteTableId,
                documentId: slug,
            })
            return post;
        }
        catch(error){
            console.log("Appwrite service :: getPost  error::",error)
            throw error;
        }
    }
    

    async getAllPosts(queries = [Query.equal("status", "active")]){
        try{
            const posts = await this.databases.listDocuments({
                databaseId: config.appwriteDatabaseId,
                collectionId: config.appwriteTableId,
                queries:queries,
            })
            return posts;
        }
        catch(error){
            console.log("Appwrite service :: getAllPosts  error::",error)
            throw error;
        }
    }
}

const DatabaseServices = new Database()

export default DatabaseServices
