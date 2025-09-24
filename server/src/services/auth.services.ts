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
   public static async verifyOtp(userId: string, otp: string) {
  try {
    // Validate inputs
    if (!userId || !otp) {
      return { success: false, message: "User ID and OTP are required" };
    }

    // Look up OTP for the user
    const validateOtp = await OTP.findOne({
      where: {
        otp,
        user: { id: userId },
      },
      relations: ["user"],
    });

    if (!validateOtp) {
      return { success: false, message: "Invalid OTP" };
    }

    if (validateOtp.isUsed) {
      return { success: false, message: "OTP already used" };
    }

    if (new Date(validateOtp.expiresAt??0).getTime() < Date.now()) {
      return { success: false, message: "OTP expired" };
    }
   
    // ✅ If we reach here, OTP is valid
    // Optionally mark it as used
    validateOtp.isUsed = true;
    await validateOtp.save();
    return { success: true, message: "OTP verified successfully", user: validateOtp.user };

  } catch (error) {
    console.error("Error verifying OTP:", error);
    return { success: false, message: "Internal server error" };
  }
}

    //verifyh otp end
}

export default AuthServices;