import User from "../models/user.entity";

export default class UserServices{

    public static async getAllUsers(){
        const allUsers= await User.find()
        return allUsers
    }
    public static async acceptUser(id:string){
        const user= await User.findOneBy({id:id})
        if(user){
            user.isUserVerified=true
            await user.save()
            return user
        }
        return null
    }
    public static async activeDeactiveUser(id:string){
        const user= await User.findOneBy({id:id})
        if(user){
            user.isActive=!user.isActive
            await user.save()
            return user
        }
        return null
    }
    public static async deleteUser(id:string){
        const user= await User.findOneBy({id:id})
        if(user){
            await user.remove()
            return user
        }
        return null
    }
}