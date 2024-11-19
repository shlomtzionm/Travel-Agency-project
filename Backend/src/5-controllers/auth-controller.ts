import express, { NextFunction, Request, Response } from "express";
import { authService } from "../4-services/authService";

class AuthController{
    public readonly router = express.Router();

    public constructor() {
      this.registerRoutes();
    }
  
    private registerRoutes(): void {
      this.router.post("/auth/google/token",  this.login);
  }
  
    private async login(request: Request, response: Response, next: NextFunction): Promise<void> {
  try {
    const {id_token} = request.body
    if(!id_token){
     response.status(400).json({ message: 'id_token is required' })
    }
    const userData = await authService.login(id_token)
    response.status(200).json({ message: 'User authenticated', user: userData });  
  } catch (error:any) {
    next(error)
  }
    }
}

export const authController = new AuthController()