import { Room } from "../models/room.model";
import { User } from "../models/user.model";

export class UserFromServer{
  _id!:string
  name!: string;
  email!: string;
  pseudo!: string;
  photo!: string;
  role!:string;
  password!:string;
  confirmPassword!:string;
  rooms!: Room[];
  friends!: User[];
  active!:boolean
}
