import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from "@nestjs/common";
import { Request, Response } from "express";

import { APP_FILTER } from "@nestjs/core";
import { logger } from "./logger";

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost): void {
    try {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const request = ctx.getRequest<Request>();
      logger.error(
        `An unexpected error occurred.\r\nException: ${exception}\r\nRequest: ${request.url}`
      );
      if (exception instanceof HttpException) {
        response
          .status(exception.getStatus())
          .send(JSON.stringify(exception.message));
        return;
      }
      response.status(500).send(JSON.stringify("Internal Server Error"));
    } catch (err) {
      logger.error(err);
    }
  }
}

export const AllExceptionFilterProvider = {
  provide: APP_FILTER,
  useClass: AllExceptionFilter,
};
