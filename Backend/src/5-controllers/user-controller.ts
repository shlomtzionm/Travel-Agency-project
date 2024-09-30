import express, { Request, Response, NextFunction } from "express";
import { UserModel } from "../3-models/userModel";
import { StatusCode } from "../3-models/enums";
import { CredentialsModel } from "../3-models/credentials-model";
import { userServices } from "../4-services/userServices";

class UserController {
  public readonly router = express.Router();

  public constructor() {
    this.router.post("/register", this.register);
    this.router.post("/login", this.login);
    this.router.post("/validate-token", this.isTokenValid);
    this.router.get("/validate-user/:userId", this.isUserExist);
  }

  private async register(request: Request, response: Response, next: NextFunction) {
    try {
      const user = new UserModel(request.body);
      const token = await userServices.register(user);
     response.status(StatusCode.Created).json(token);
    } catch (err: any) {
      next(err);
    }
  }
 

  private async login(request: Request, response: Response, next: NextFunction) {
    try {
      const credentials = new CredentialsModel(request.body);
      const token = await userServices.login(credentials);
      response.json(token);
    } catch (err: any) {
      next(err);
    }
  }

  private async isTokenValid(request: Request, response: Response, next: NextFunction) {
    try {
        const token = request.body.token
const isTokenValid =await userServices.isTokenValid(token)
response.send(isTokenValid)   
} catch (error: any) {
      next(error);
    }
  }

  private async isUserExist(request: Request, response: Response, next: NextFunction) {
    try {
        const user = +request.params.userId
const isUserExist =await userServices.isUserExist(user)
response.send(isUserExist)   
} catch (error: any) {
      next(error);
    }
  }
}
export const userController = new UserController();
