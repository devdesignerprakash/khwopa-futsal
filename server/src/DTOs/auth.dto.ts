import { Role } from "../models/user.entity";

export interface RegisterDto{
    fullName:string,
    email:string,
    phoneNumber:string,
    address:string,
    password:string,
    role?:Role
}
export interface LoginDto{
    phoneNumber?:string,
    email?:string,
    password:string
}