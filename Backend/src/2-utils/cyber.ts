import crypto from "crypto";
import { appConfig } from "./app-config";
import jwt, { SignOptions } from "jsonwebtoken";
import { Role } from "../3-models/enums";
import { UserModel } from "../3-models/userModel";

class Cyber {
  public hash(plainText: string): string {
    return crypto
      .createHmac("sha512", appConfig.passwordSalt)
      .update(plainText)
      .digest("hex");
  }

  public generateNewToken(user: UserModel): string {
    delete user.password;
    const container = { user };
    const options: SignOptions = { expiresIn: "3h" };
    const token = jwt.sign(container, appConfig.jwtSecretKey, options);
    return token;
  }

  public isTokenValid(token: string): boolean {
    try {
      if (!token) return false;
      jwt.verify(token, appConfig.jwtSecretKey);
      return true;
    } catch (err: any) {
      return false
    }
  }


  public  isAdmin(token:string):boolean{
    try{
const container = jwt.decode(token) as {user:UserModel}
const user = container.user
return user.roleId === Role.Admin
    }catch(err:any){
return false
    }
  }
}

export const cyber = new Cyber();
