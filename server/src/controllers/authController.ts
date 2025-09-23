import { LoginDto, RegisterDto, UserDTO } from "../DTOs/auth.dto";
import User from "../models/user.entity";
import AuthServices from "../services/auth.services";
import { Body, Controller, Get, Middlewares, Post, Request, Route, SuccessResponse, Tags} from "tsoa";
import bcrypt from 'bcryptjs'
import { generateToken } from "../utils/token";
import jwt from "jsonwebtoken";
import { validationMiddleware } from "../utils/validator";
import { toUserDTO } from "../utils/fetchUserDetails";
import { otpGenerator } from "../utils/OTPGenerator";
import { sendEmail } from "../utils/sendEmail";
@Route("auth")
@Tags("Auth")
export class AuthController extends Controller {

  /**
   * Register a new user
   * @param body User registration data
   * @returns Registration response with user details
   */
  @Post("/register")
  @Middlewares(validationMiddleware(RegisterDto))
  @SuccessResponse("201", "User registered successfully")
  public async registerUser(@Body() body: RegisterDto) {
    try {
      // Check if user already exists
      const existUser = await User.findOne({ where: [{ email: body.email }, { phoneNumber: body.phoneNumber }] });
      if (existUser) {
        this.setStatus(400);
        return { message: "User already exists" };
      }

      // Register new user
      const newUser = await AuthServices.registerUser(body);
      const otp= otpGenerator()
      sendEmail(newUser.email)
      const { password, ...userDetails } = newUser
      this.setStatus(201);
      return {
        message: "User registered successfully",
        data: userDetails
      }
    } catch (error) {
      this.setStatus(500);
      return {
        message: `Registration failed: ${error instanceof Error ? error.message : "Unknown error"}`,
      };
    }
  }
 
  @Post("/login")
  @Middlewares(validationMiddleware(LoginDto))
  @SuccessResponse("200", "User logged in Successfully")
  public async login(@Body() body: LoginDto) {
    try {
      const existUser = await User.findOne({
        where: 
          {
            phoneNumber: body.phoneNumber
          }
      })
      if (!existUser) {
        this.setStatus(404)
        return { message: "User doesn't Exist" }
      }
      const passwordMatch = await bcrypt.compare(body.password, existUser.password)
      if (!passwordMatch) {
        this.setStatus(401)
        return { message: "Inavlid credentials" }
      }
      const token = generateToken({ userId: existUser.id, role: existUser.role })
     this.setHeader("Set-Cookie", `token=${token}; HttpOnly; Path=/; Max-Age=${60 * 60 * 24}; SameSite=Lax`)
     const {password,likes,bookings,...user}=existUser
      this.setStatus(200)
      return { message: "user logged in Successfully",user, isLoggedIn:true}
    } catch (error) {
      this.setStatus(500);
      return {
        message: `Registration failed: ${error instanceof Error ? error.message : "Unknown error"}`,
      };
    }
  }
@Post("/logout")
@SuccessResponse("200", "User logged out successfully")
  public logout(): { message: string } {
    // Set the Set-Cookie header to clear the cookie
    this.setHeader(
      "Set-Cookie",
      "token=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax"
    );

    this.setStatus(200);
    return { message: "User logged out successfully" };
  }

  //check whether user is logged in or not
  @Get("/status")
  @SuccessResponse("200", "User is logged in")
  public async checkStatus(@Request() req: { headers: { cookie?: string } }): Promise<{ isLoggedIn: boolean, user:UserDTO |null}> {
    try {
        const cookiesHeader = req.headers.cookie;
        if (!cookiesHeader) {
            this.setStatus(200);
            return { isLoggedIn: false, user: null };
        }

        const tokenCookie = cookiesHeader
            .split(';')
            .find(cookie => cookie.trim().startsWith('token='));
        
        const token = tokenCookie?.split('=')[1];
        const verify = token ? jwt.verify(token, process.env.JWT_SECRET || 'mysuperheroismydad') as { userId: string, role?: string } : null;
        const userId= verify?.userId
        const user= await User.findOne({where:{id:userId}})
        
        if (token && token.trim()&&user)  {
            this.setStatus(200);
            return { isLoggedIn: true, user:toUserDTO(user) };
        }

        this.setStatus(200);
        return { isLoggedIn: false,user:null };
    } catch (error) {
        console.error('Error checking login status:', error);
        this.setStatus(500);
        return { isLoggedIn: false, user:null};
    }
}
}

export default AuthController;