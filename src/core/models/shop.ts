import { User } from "./user";

export interface Shop{
    id:number,
    name:string,
    description:string,
    opening_hours:string,
    closing_hours:string,
    adress:string,
    logo:string,
    created_at:string
    owner:User
}