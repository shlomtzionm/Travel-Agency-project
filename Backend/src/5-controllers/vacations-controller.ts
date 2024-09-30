import express, { NextFunction, Request, Response } from "express";
import { vacationsService } from "../4-services/vacations-service";
import { StatusCode } from "../3-models/enums";
import { VacationModel } from "../3-models/vacationModel";
import { fileSaver } from "uploaded-file-saver";
import { securityMiddleware } from "../6-middleware/security-middleware";

class VacationsController {
  public readonly router = express.Router();

  public constructor() {
    this.registerRoutes();
  }

  private registerRoutes(): void {
    this.router.get("/vacations-by-user/:userId", securityMiddleware.verifyLoggedIn, this.getAllVacations);
    this.router.get("/vacations-by-user/:userId/:vacationId", securityMiddleware.verifyLoggedIn, this.getOneVacationById);
    this.router.post("/vacations", securityMiddleware.verifyLoggedIn, securityMiddleware.verifyAdmin, this.addVacation);
    this.router.put("/like/:userId/:vacationId", securityMiddleware.verifyLoggedIn, this.updateIsLiked);
    this.router.patch("/vacations/:vacationId/:userId", securityMiddleware.verifyLoggedIn, securityMiddleware.verifyAdmin, this.updateVacation);
    this.router.get("/vacations/images/:imageName", this.getProductImage);
    this.router.delete("/vacations/:id", securityMiddleware.verifyLoggedIn, securityMiddleware.verifyAdmin, this.deleteVacation);
  }

  private async getAllVacations(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const userId = +request.params.userId;
      const vacations = await vacationsService.getAllVacations(userId);
      response.json(vacations);
    } catch (err: any) {
      next(err);
    }
  }

  private async getOneVacationById(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const vacationId = +request.params.vacationId;
      const userId = +request.params.userId;
      
      const vacation = await vacationsService.getOneVacationById(userId, vacationId);
      response.json(vacation);
    } catch (err: any) {
      next(err);
    }
  }

  private async addVacation(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      request.body.image = request.files?.image;
      const vacation = new VacationModel(request.body);
      await vacationsService.addVacation(vacation);
      response.sendStatus(StatusCode.Created);
    } catch (err: any) {
      next(err);
    }
  }

  private async deleteVacation(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const id = +request.params.id;
      await vacationsService.deleteVacation(id);
      response.sendStatus(StatusCode.NoContent);
    } catch (err: any) {
      next(err);
    }
  }

  private async getProductImage(request: Request, response: Response, next: NextFunction) {
    try {
      const imageName = request.params.imageName;
      const imagePath = fileSaver.getFilePath(imageName, true);
      response.sendFile(imagePath);
    } catch (err: any) {
      next(err);
    }
  }
  private async updateIsLiked(request: Request, response: Response, next: NextFunction) {
    try {
      const userId = +request.params.userId;
      const vacationId = +request.params.vacationId;
      const isLiked = request.body.isLiked;
      const updatedVacation = await vacationsService.updateIsLiked(isLiked, userId, vacationId);
      response.status(StatusCode.OK).send(updatedVacation);
    } catch (error: any) {
      next(error);
    }
  }

  private async updateVacation(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const vacationId = +request.params.vacationId;
      const userId = +request.params.userId;
      if (request.files?.image) {
        request.body.image = request.files.image;
      }

      request.body.startDate = formatDateToLocalString(new Date(request.body.startDate));
      request.body.endDate = formatDateToLocalString(new Date(request.body.endDate));
      const vacationBody = new VacationModel(request.body);

      const updatedVacation = await vacationsService.updateVacation(vacationId, vacationBody, userId);
      response.json(updatedVacation);
    } catch (err: any) {
      next(err);
    }
  }
}

function formatDateToLocalString(date: Date) {
  const pad = (num: number) => String(num).padStart(2, "0");
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());

  return `${year}-${month}-${day}`;
}

export const vacationsController = new VacationsController();
