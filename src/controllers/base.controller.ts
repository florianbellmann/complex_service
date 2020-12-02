import { Controller, Get } from "@nestjs/common";

@Controller("/")
export class BaseController {
  @Get()
  public getHealthStatus(): string {
    return "online";
  }
}
