import config from "../config/config"
import { Client, Account, ID } from "appwrite";

export class AuthService{
    client=new Client();
    account;
    
    constructor(){
        this.client
            .setProject(config.appwriteProjectId)
            .setEndpoint(config.appwriteURL);
        this.account=new Account(this.client)
    }

    async createAccount({email,password,name}){
        try {
            const userAccount= await this.account.create(
                ID.unique(),email,password,name);
            if(userAccount){
                // login
                return this.Login({email,password});
            }
            else{
                // more chance it is null
                return userAccount;
            }
        } 
        catch (error) {
            throw error;    
        }
    }
    
    async Login({email,password}){
        try {
            const user = await this.account.createEmailPasswordSession(email,password);    
            if(!user){
                console.log("Wrong Credentials")
                return "Wrong Credentials"
            }
        } catch (error) {
            throw error
        }
    }
    
    async getCurrentUser(){
        try {
            return await this.account.get()
        } 
        catch (error) {
            console.log("AppWrite Service :: getCurrentUser :: error ",error)
            throw(error)
        }
        return null;
    }

    async logout(){
        try {
            if(this.getCurrentUser){
                return await account.deleteSessions();
            }
            return "User not authenticated"
        } catch (error) {
            console.log("AppWrite Service :: logout :: error ",error)
            // throw error
        }
    }

}

const authService = new AuthService();

export default authService