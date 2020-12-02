import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { determineSecret, getTokenFromHeader } from "../helpers/auth.helper";

import { Observable } from "rxjs";
import { logger } from "../logger";

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate = (
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> => {
    //TODO: remove this again
    // return true;
    const request = context.switchToHttp().getRequest();
    try {
      const staticToken = determineSecret();
      console.log("using token", staticToken);
      const requestToken = getTokenFromHeader(request);
      logger.info(staticToken);
      logger.info(requestToken);
      logger.info(staticToken === requestToken);
      return staticToken === requestToken;
    } catch (error) {
      logger.error(error);
      return false;
    }
  };
}
