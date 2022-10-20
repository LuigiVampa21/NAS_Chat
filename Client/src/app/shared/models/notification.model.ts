import { User } from "./user.model";

export class Notification {
    _id?:string;
    sort!:string;
    from!:any;
    room!:string;
    status?:string;
    createdAt?:Date;
}
