import { Message } from "./message.model";
import { User } from "./user.model";

export class Room
{
  _id?:string;
  name?:string;
  users?:User[];
  // chat?:Message[];
  chat?:any[];
  createdAt?:Date;
  updatedAt?:Date;
  penFriend?:string;
}
