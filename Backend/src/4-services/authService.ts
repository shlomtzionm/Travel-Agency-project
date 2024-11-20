import { OAuth2Client } from "google-auth-library"
import { UserModel } from "../3-models/userModel"
import { cyber } from "../2-utils/cyber"

class AuthService{

   
        public CLIENT_ID ="736266445281-90bbb6epujrk5gk6jjdggmd1up75dntd.apps.googleusercontent.com"
        public client = new OAuth2Client(this.CLIENT_ID)
  


public async login(id_token:string){
    
const ticket = await this.client.verifyIdToken({
    idToken:id_token,
    audience:this.CLIENT_ID
})
const payload = ticket.getPayload()
const user = new UserModel({firstName:payload.given_name, lastName:payload.family_name,email:payload.email})
return cyber.generateNewToken(user)
}


}

export const authService = new AuthService()