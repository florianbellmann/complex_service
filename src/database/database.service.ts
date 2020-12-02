import * as path from "path";
import * as sqlite3 from "sqlite3";

import { Injectable } from "@nestjs/common";
import { SelectionQueries } from "./selection.queries";
import { logger } from "../logger";

const sqlite =
  process.env.NODE_ENV !== "production" ? sqlite3.verbose() : sqlite3;

@Injectable()
export class DatabaseService {
  private _db: sqlite3.Database;
  private DATABASE =
    process.platform === "darwin"
      ? "../data/database.db"
      : path.resolve(process.env.DATABASE || "data/database.db");

  constructor() {}

  public executeQuery<T>(query: SelectionQueries): Promise<T> {
    const that = this;

    return new Promise((resolve, reject) => {
      that.connect();

      try {
        that._db.all(query.toString(), function (err: any, res: any) {
          if (err) {
            logger.error("Error during database operation.", query, err);
            that.disconnect();
            reject(err);
          }
          logger.info("Executed query: " + query);
          console.log(res);
          resolve(res);
        });
      } catch (error) {
        logger.error("Error during database operation.", query, error);
        that.disconnect();
        reject(error);
      }

      this.disconnect();
    });
  }

  private connect(): void {
    this._db = new sqlite.Database(this.DATABASE, (err: Error): void => {
      if (err) {
        logger.error(err.message);
      }
      logger.info("Connected to the SQlite database.");
    });
  }

  private disconnect(): void {
    if (this._db) {
      this._db.close((err: Error): void => {
        if (err) {
          logger.error(err.message);
        }
        logger.info("Closed the database connection.");
      });
    } else {
      logger.error("Could not disconnect, because db object is null.");
    }
  }
}
