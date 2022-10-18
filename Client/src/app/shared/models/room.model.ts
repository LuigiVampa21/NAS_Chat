import { User } from "./user.model";

export class Room
{
  _id?:string;
  name!:string;
  users!:User[];
  createdAt!:Date;
}
