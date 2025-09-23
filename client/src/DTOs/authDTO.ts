export interface LoginDTO{
    "phoneNumber"?:string,
    "email"?:string,
    "password":string
}

export interface LoggedInUserResponseDTO{
    id:string
    fullName:string
    phoneNumber:string
    email:string
    address:string
    role:"admin"|"user"

}
export interface AuthResponse{

    message:string
    isLoggedIn:boolean
    user:LoggedInUserResponseDTO
    userId?:string
}
export interface RegisterDTO{
    "phoneNumber":string,
   "address":string,
    "email":string,
    "password":string,
    "fullName":string
}
export interface RegisterResponse{
    data:string,
    message:string
}