import { Role } from "../models/user.entity";

export interface UserDto{
    fullName:string,
    email:string,
    phoneNumber:string,
    address:string,
    password:string,
    role?:Role
}