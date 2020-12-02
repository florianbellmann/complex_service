import { DatabaseService } from "../database/database.service";
import { Injectable } from "@nestjs/common";
import { SelectionQueries } from "../database/selection.queries";
import { User } from "../model/user";

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}

  get() {
    const result = this.databaseService.executeQuery<User[]>(
      SelectionQueries.AllUsers
    );
    return result;
  }
}
