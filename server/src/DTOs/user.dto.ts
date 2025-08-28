export enum Role{
    USER="user",
    Admin="admin"
}

export interface UserDto{
    fullName:string,
    email:string,
    phoneNumber:string,
    address:string,
    password:string,
    role:Role
}