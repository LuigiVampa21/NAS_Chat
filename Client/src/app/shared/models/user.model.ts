import { Room } from "./room.model";

export class User {
    _id?:string
    name!: string;
    email!: string;
    pseudo!: string;
    photo!: string;
    role!:string;
    password!:string;
    confirmPassword!:string;
    rooms!: Room[];
    friends!: User[];
    active!:boolean;
    status?:string
}
