import { Request, Response } from "express";
import { UserDto } from "../DTOs/user.dto";
import User from "../models/user.entity";
import AuthServices from "../services/auth.services";


class AuthControllers {
static async registerUser(req:Request,res:Response){
    try{
        const {fullName, email, phoneNumber, address, password}=req.body
        const existUser= await User.findOne({where:{email}})

        if(existUser){
            return res.status(400).json({message:"User already exist"})
        }
        const user:UserDto={
            fullName,
            email,
            phoneNumber,
            address,
            password,
            
        }
        const newUser= await AuthServices.registerUser(user)
        return res.status(200).json({message:"User registered successfully"})
    }catch(error){
        console.log(error)
    }
}
}

export default AuthControllers