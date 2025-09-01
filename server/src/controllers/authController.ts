import { UserDto } from "../DTOs/user.dto";
import User from "../models/user.entity";
import AuthServices from "../services/auth.services";
import { Body, Controller, Post, Route, SuccessResponse, Tags } from "tsoa";

// Define response interface
interface RegisterResponse {
  message: string;
  data?:UserResponseDto; // Exclude password from User type
}
interface UserResponseDto{
  id:string,
  fullName:string,
  phoneNumber:string,
  email:string,
  address:string,
  role:string

}
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
  public async registerUser(@Body() body: UserDto): Promise<RegisterResponse> {
    console.log(body)
    try {
      // Check if user already exists
      const existUser = await User.findOne({ where: { email: body.email } });
      if (existUser) {
        this.setStatus(400);
        return { message: "User already exists" };
      }

      // Register new user
      const newUser:any= await AuthServices.registerUser(body);
    

      const {password,...userDetails}=newUser

      this.setStatus(201);
      return {
        data: userDetails,
        message: "User registered successfully",
      };
    } catch (error) {
      this.setStatus(500);
      return {
        message: `Registration failed: ${error instanceof Error ? error.message : "Unknown error"}`,
      };
    }
  }
}

export default AuthController;