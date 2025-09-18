import { Role } from "../models/user.entity";
import { IsEmail, IsEmpty, IsNotEmpty, IsOptional, Length } from "class-validator";

export interface RegisterDto{
    fullName:string,
    email:string,
    phoneNumber:string,
    address:string,
    password:string,
    role?:Role
}


export class LoginDto {
  @IsOptional()
  @IsEmpty({ message: 'Either email or phone number is required' })
  @Length(10, 10, { message: 'Phone number must be 10 digits' })
  phoneNumber?: string;

  @IsOptional()
  @IsEmpty({ message: 'Either phone number or email is required' })
  @IsEmail(undefined, { message: 'Invalid email format' })
  email?: string;

  @IsNotEmpty({ message: 'Password is required' })
  password: string;
}