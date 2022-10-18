import { Message } from "./message.model";
import { User } from "./user.model";

export class Call
{
  _id?:string;
  users!:User[];
  duration!:string;
  createdAt!:Date;
  penFriend?:string;
  status!:string
}
