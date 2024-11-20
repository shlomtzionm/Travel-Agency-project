import axios from "axios"
import { appConfig } from "../Utils/AppConfig"
import { jwtDecode } from "jwt-decode"
import { UserModel } from "../Models/userModel"
import { currentPageActions, store, userActions } from "../redux/store"

class AuthService{


    public async login(idToken:string){
        console.log(idToken);
        if(idToken){
            const res=  await axios.post(appConfig.googleUrl,{id_token:idToken})
            const token:string = res.data
            console.log(token);
            
            localStorage.setItem("token",token)
            const container = jwtDecode<{ user:Partial< UserModel> }>(token);
            const dbUser:Partial<UserModel> = container.user;
            const action = userActions.initUser(dbUser);
            store.dispatch(action);
            const resetPageAction = currentPageActions.updateCurrentPage(1);
            store.dispatch(resetPageAction);
        }
        
    
    }
}

export const authService = new AuthService()