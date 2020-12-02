import { HttpModule, Module } from "@nestjs/common";

import { AllExceptionFilterProvider } from "./exception.filter";
import { BaseController } from "./controllers/base.controller";
import { DatabaseService } from "./database/database.service";
import { UserController } from "./controllers/user.controller";
import { UserService } from "./services/user.service";

@Module({
  imports: [HttpModule],
  controllers: [
    BaseController,
    UserController,
  ],
  providers: [
    AllExceptionFilterProvider,
    DatabaseService,
    UserService,
  ],
})
export class AppModule {}
