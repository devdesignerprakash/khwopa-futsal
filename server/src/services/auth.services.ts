import { UserDto } from "../DTOs/user.dto";
import  User  from "../models/user.entity";

class AuthServices{
   static async  registerUser(data:UserDto){
        const newUser= User.create({
            fullName:data.fullName,
            phoneNumber:data.phoneNumber,
            email:data.email,
            address:data.address,
            password:data.password,
            role:data.role
        })
        await newUser.save()
    }
    async loginUser(data:UserDto){

    }
    
}

export default AuthServices;