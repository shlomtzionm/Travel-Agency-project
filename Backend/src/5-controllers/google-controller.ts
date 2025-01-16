import express, { NextFunction, Request, Response } from "express";
import { UserModel } from "../3-models/userModel";
import { StatusCode } from "../3-models/enums";
import { googleService } from "../4-services/googleService";

class GoogleController{
    public readonly router = express.Router();

    public constructor() {
      this.registerRoutes();
    }
  
    private registerRoutes(): void {
      this.router.post("/auth/google/token",  this.login);
      this.router.post("/auth/google/token/register",  this.register);
  }

  private async register(request: Request, response: Response, next: NextFunction){
    try {
      const {idToken } = request.body
const token = await googleService.register(idToken)
response.status(StatusCode.Created).json(token)
    } catch (error:any) {
      next(error)
    }
  }
  
    private async login(request: Request, response: Response, next: NextFunction): Promise<void> {
  try {
    const {id_token} = request.body
    if(!id_token){
     response.status(400).json({ message: 'id_token is required' })
    }
    const jwtToken = await googleService.login(id_token)
    response.status(200).json( jwtToken );  
  } catch (error:any) {
    next(error)
  }
    }
}

export const googleController = new GoogleController()