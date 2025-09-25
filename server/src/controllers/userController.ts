import { verifyAdmin, verifyToken } from "../utils/token";
import UserServices from "../services/user.services";
import { Controller, Get, Middlewares, Route, SuccessResponse, Tags } from "tsoa";


@Route("user")
@Tags("Users")
export class UserController extends Controller{
/**
 * get all users
 */
@Get("/all-users")
@Middlewares(verifyToken, verifyAdmin)
@SuccessResponse("200", "Users fetched successfully")
public async getAllUsers(){
    const users= await UserServices.getAllUsers()
    this.setStatus(200)
    return {message:"users fetched successfully",users}
}   


}