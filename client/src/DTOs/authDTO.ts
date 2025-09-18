export interface LoginDTO{
    "phoneNumber"?:string,
    "email"?:string,
    "password":string
}

export interface LoginResponse{

    message:string
    
}
export interface RegisterDTO{
    "phoneNumber"?:string,
    "email"?:string,
    "password":string,
    "fullName":string
}
export interface RegisterResponse{
    data:string,
    message:string
}