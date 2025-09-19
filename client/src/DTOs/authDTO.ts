export interface LoginDTO{
    "phoneNumber"?:string,
    "email"?:string,
    "password":string
}

export interface AuthResponse{

    message:string
    role?:string
    
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