import { NextFunction, Request, Response } from "express";
import { RouteNotFoundError } from "../3-models/client-errors";
import { logger } from "../2-utils/logger";
import { appConfig } from "../2-utils/app-config";
import { StatusCode } from "../3-models/enums";

class ErrorsMiddleware {
  // Route not found:
  public routeNotFound(request: Request, response: Response, next: NextFunction): void {
    // Create client error:
    const err = new RouteNotFoundError();

    // Go to catch-all:
    next(err);
  }

  // Catch all:
  public catchAll(err: any , request: Request, response: Response, next: NextFunction): void {
    // Log error to console:
    console.log(err);

    // Log error to file:
    logger.logError(err);

    // Take error status:
    let status = err.status || StatusCode.InternalServerError;

    // Take error message:
    let message = status === StatusCode.InternalServerError && appConfig.isProduction ? "Some error, please try again later." : err.message;

    if (err instanceof AggregateError) {
        status = 500
        message = "Network error"
      }
   
      if (err instanceof Error) {
        if (err.message.includes('mysql') || err.message.includes('database') || err.message.includes('query')) {
          status = 500
          message = "Network error"
        } else {
          status = 500
          message = "Internal Server Error"
        }
      }

    // Response the error:
    response.status(status).send(message);
  }
}

export const errorsMiddleware = new ErrorsMiddleware();
