export interface UserDTO{
    id: string,
    fullName:string,
    email: string;
    password: string;
    role: string;
    phoneNumber:string,
    isActive:boolean,
    isEmailVerified:boolean,
    isUserVerified:boolean,
    createdAt:Date,
    updatedAt:Date
}
