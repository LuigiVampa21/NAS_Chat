import { Room } from "./room.model";
import { User } from "./user.model";

export class Message {
  content!:string;
  user!:User;
  room!:Room;
  poster!:string;
  createdAt!:Date
}
