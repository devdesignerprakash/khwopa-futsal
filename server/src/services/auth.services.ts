import { OTP } from "../models/otp.entity";
import { RegisterDto } from "../DTOs/auth.dto";
import User from "../models/user.entity";

class AuthServices {
    // create user
    public static async registerUser(data: RegisterDto) {
        const newUser = User.create({
            fullName: data.fullName,
            phoneNumber: data.phoneNumber,
            email: data.email,
            address: data.address,
            password: data.password,
            role: data.role
        })
        await newUser.save()
        return newUser;
    }
    //end of creat user

    //create otp
    public static async creatOtp(otp: string, userId: string) {
        const newOtp = OTP.create({
            otp: otp,
            expiresAt: new Date(Date.now() + 5 * 60 * 1000),
            user: { id: userId } as User
        })
        await newOtp.save()
        return newOtp
    }
    //create otp end

    //verify otp
    public static async verifyOtp(id:string,otp: string){
        const validateOtp = await OTP.findOne({ where: { otp: otp, user: { id: id} } })
        if (!validateOtp) {
            return { message: "Invalid OTP" }
        }
        if (validateOtp.isUsed) {
            return { message: "OTP already used" }
        }
        const expiryStatus = new Date(validateOtp?.expiresAt ?? 0).getTime() < Date.now();
        if (expiryStatus) {
            return { message: "OTP expired" }
        }
        return { message: "OTP verified" }
    }
    //verifyh otp end
}

export default AuthServices;