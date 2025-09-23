import { OTP } from "../models/otp.entity";
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
    
    public static async creatOtp(otp:string,userId:string){
        const newOtp= OTP.create({
            otp:otp,
            expiresAt:new Date(Date.now()+5*60*1000),
            user:{id:userId} as User
        })
        await newOtp.save()
        return newOtp
    }
}

export default AuthServices;