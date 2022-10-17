import { User } from "./user.model";

export class Room
{
  name!:string;
  user!:User[];
  createdAt!:Date;
}
