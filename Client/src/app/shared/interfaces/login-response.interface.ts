import { User } from "../models/user.model";
import { UserFromServer } from "./user-from-server.interface";

export interface loginResponse {
  status: string,
  user: UserFromServer,
  token: string,
  expiring: string
}
