import User from "../models/user.entity";

export default class UserServices{

    public static async getAllUsers(){
        const allUsers= await User.find()
        return allUsers
    }
}