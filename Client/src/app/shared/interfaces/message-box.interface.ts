import { Room } from "../models/room.model";

export class MessageBox{
  photo?: string;
  name?: string;
  content?:string;
  createdAt?:Date;
  timestamp!:number
  room?:Room
}
