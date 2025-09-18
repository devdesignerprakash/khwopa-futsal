import { LoginDto, RegisterDto } from "../DTOs/auth.dto";
import User from "../models/user.entity";
import AuthServices from "../services/auth.services";
import { Body, Controller, Middlewares, Post, Route, SuccessResponse, Tags} from "tsoa";
import bcrypt from 'bcryptjs'
import { generateToken } from "../utils/token";
import { validationMiddleware } from "../utils/validator";

@Route("auth")
@Tags("Auth")
export class AuthController extends Controller {

  /**
   * Register a new user
   * @param body User registration data
   * @returns Registration response with user details
   */
  @Post("/register")
  @SuccessResponse("201", "User registered successfully")
  public async registerUser(@Body() body: RegisterDto) {
    try {
      // Check if user already exists
      const existUser = await User.findOne({ where: { email: body.email } });
      if (existUser) {
        this.setStatus(400);
        return { message: "User already exists" };
      }

      // Register new user
      const newUser = await AuthServices.registerUser(body);
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
        where: [
          {
            email: body.email
          },
          {
            phoneNumber: body.phoneNumber
          }
        ]
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
      this.setStatus(200)
      return { message: "user logged in Successfully" }
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
}

export default AuthController;