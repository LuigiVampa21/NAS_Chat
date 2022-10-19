import { Room } from "./room.model";
import { User } from "./user.model";

export class Message {
  content!:string;
  // user!:User;
  room!:Room | string;
  poster!:string;
  createdAt?:Date
}
