import { Role } from "../models/user.entity";
import { IsEmail, IsNotEmpty, IsOptional, Length, Matches } from "class-validator";

export class RegisterDto{
    @IsNotEmpty({ message: 'Full name is required' })
    @Length(3, 50, { message: 'Full name must be between 3 and 50 characters' })
    fullName:string


    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail(undefined, { message: 'Invalid email format' })
   email:string


    @IsNotEmpty({ message: 'Phone number is required' })
    @Length(10, 10, { message: 'Phone number must be 10 digits' })
    phoneNumber:string


    @IsNotEmpty({ message: 'Address is required' })
    @Length(3, 100, { message: 'Address must be between 10 and 100 characters' })
    address:string


    @IsNotEmpty({ message: 'Password is required' })
    @Length(8, 15, { message: 'Password must be between 8 and 20 characters' })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, { message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character' })
    password:string


    @IsOptional()
    role?:Role
}

export class LoginDto {
  @IsNotEmpty({ message: 'phone number is required' })
  @Length(10, 10, { message: 'Phone number must be 10 digits' })
  phoneNumber!: string;

  @IsNotEmpty({ message: 'Password is required' })
  password!: string;
}