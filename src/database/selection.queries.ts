import { TableNames } from "./table.names";

export enum SelectionQueries {
  AllUsers = "SELECT * FROM " + TableNames.Users
}
