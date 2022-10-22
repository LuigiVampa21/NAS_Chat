import { Room } from "./room.model";
import { Notification } from "./notification.model";

export class User {
    _id?:string
    name!: string;
    email!: string;
    pseudo!: string;
    // status?
    photo!: string;
    notifications?: Notification[];
    role!:string;
    password!:string;
    confirmPassword!:string;
    rooms!: Room[];
    phone?:string;
    friends!: User[];
    active!:boolean;
    status?:string
}
