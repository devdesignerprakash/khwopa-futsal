import { Request, Response } from "express";
import { UserDto } from "../DTOs/user.dto";
import { User } from "../models/user.entity";



const registerUser=async(req:Request,res:Response)=>{
    try{
        const {fullName, email, phoneNumber, address, password, role}=req.body
        



    }catch(error){
        console.log(error)
    }
}