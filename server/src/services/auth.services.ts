import { RegisterDto} from "../DTOs/auth.dto";
import  User  from "../models/user.entity";

class AuthServices{
   public static async  registerUser(data:RegisterDto){
        const newUser= User.create({
            fullName:data.fullName,
            phoneNumber:data.phoneNumber,
            email:data.email,
            address:data.address,
            password:data.password,
            role:data.role
        })
        await newUser.save()
        return newUser;
    }
    
}

export default AuthServices;