import { authUser } from "./authUser";

export interface LoggedUser extends authUser {
  token: string;
}
