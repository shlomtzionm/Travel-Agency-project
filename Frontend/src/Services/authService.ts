import axios from "axios"
import { appConfig } from "../Utils/AppConfig"

class AuthService{


    public async login(credential:string){
        return  await axios.post(appConfig.googleUrl,{id_token:credential})
    }
}

export const authService = new AuthService()