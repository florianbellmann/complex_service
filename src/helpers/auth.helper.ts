import { Request } from "express";
import { dotenvConfig } from "../config";

dotenvConfig;

export const determineSecret = (): string => {
  if (process.env.NODE_ENV !== "production") return "secret";
  if (!process.env.STATIC_TOKEN) throw "NO STATIC TOKEN PRESENT!";
  else return process.env.STATIC_TOKEN;
};

export const getTokenFromHeader = (req: Request): string => {
  if (
    (req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Token") ||
    (req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "bearer")
  ) {
    return req.headers.authorization.split(" ")[1];
  }

  return null;
};
