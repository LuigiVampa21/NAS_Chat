import { Room } from "../../core/models/room.model";
import { User } from "../../core/models/user.model";

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
