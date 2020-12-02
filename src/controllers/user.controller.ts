import { Controller, Get, UseGuards } from "@nestjs/common";

import { AuthGuard } from "../guards/auth.guard";
import { UserService } from "../services/user.service";

@Controller("/users")
@UseGuards(AuthGuard)
export class UserController {
  public constructor(private readonly userService: UserService) {}

  @Get("/")
  public get() {
    return this.userService.get();
  }
}
