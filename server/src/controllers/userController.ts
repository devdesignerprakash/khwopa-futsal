import { verifyAdmin, verifyToken } from "../utils/token";
import UserServices from "../services/user.services";
import { Controller, Delete, Get, Middlewares, Patch, Path, Route, SuccessResponse, Tags } from "tsoa";


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
/**
 * 
 * @param id 
 * @returns message of acceptance
 */
@Patch("/approve-user/:id")
@Middlewares(verifyToken, verifyAdmin)
@SuccessResponse("200", "Users accepted successfully")
public async acceptUser( @Path() id:string){
    const user= await UserServices.acceptUser(id)
    this.setStatus(200)
    return {message:"user accepted successfully"}
} 

@Patch("/active-deactive-user/:id")
@Middlewares(verifyToken, verifyAdmin)
@SuccessResponse("200", "Users active/deactive successfully")
public async activeDeactiveUser(@Path() id:string){
    const user= await UserServices.activeDeactiveUser(id)
    this.setStatus(200)
    return {message:`user ${user?.isActive?"activated":"deactivated"} successfully`}
}

@Delete("/delete-user/:id")
@Middlewares(verifyToken, verifyAdmin)
@SuccessResponse("200", "Users deleted successfully")
public async deleteUser(@Path() id:string){
    const user= await UserServices.deleteUser(id)
    this.setStatus(200)
    return {message:"user deleted successfully"}
}





}