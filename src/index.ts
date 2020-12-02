import { AppModule } from "./app.module";
import { NestFactory } from "@nestjs/core";
import { dotenvConfig } from "./config";
import { logger } from "./logger";

dotenvConfig;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const serverPort = process.env.PORT || 3000;
  await app.listen(serverPort);
  logger.info("Server listeinng on port " + serverPort);
}
bootstrap();
