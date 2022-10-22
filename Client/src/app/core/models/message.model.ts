import { Room } from "./room.model";
import { User } from "./user.model";

export class Message {
  _id?:string;
  content!:string;
  room!:Room | string;
  poster!:string;
  createdAt?:Date
}
