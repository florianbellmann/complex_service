import * as path from "path";

import dotenv from "dotenv";

export const dotenvConfig = dotenv.config({
  path: path.join(__dirname, "..", ".env"),
});
