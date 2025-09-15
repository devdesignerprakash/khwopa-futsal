import { BookedByServices } from "../services/bookedBy.services";
import { BookedUserDTO } from "../DTOs/booking.dto";
import { Body, Controller, Get, Middlewares, Path, Post, Route, SuccessResponse, Tags } from "tsoa";
import { Booking } from "../models/booking.entity";
import { BookingStatus } from "../utils/status.enum";
import { verifyToken } from "../utils/token";
import { BookedByUser } from "../models/bookedbyUser.entity";

@Route('bookedBy')
@Tags("BookedBy")
export class bookeByController extends Controller{
    /**
     * @body userid bookingid
     * @returns bookedbyUser
     */
@Post("/book")
@Middlewares(verifyToken)
@SuccessResponse("201", "Created")
public async createBooking(@Body()body:BookedUserDTO) {
    try{
       const booking= await Booking.findOne({where:{id:body.bookingId}})
       if (!booking) {
        this.setStatus(404)
        return { message: "Booking doesn't Exist" }
       }
       if(booking?.bookingStatus!==BookingStatus.NOT_BOOKED
        &&
        booking.bookingStatus!==BookingStatus.CANCELLED ){
        this.setStatus(400)
        return {message:"Booking already exist"}
       }
       const bookedUser= await BookedByServices.createBooked(body)
       this.setStatus(201)
       return {data:bookedUser}

    }catch(error){
        console.log("create booked controller error",error)
        this.setStatus(500)
        return {message:"Internal server error"}
    }
}
/**
 *get all booked
 */
@Get("/all-booked")
@SuccessResponse("200","all booked is fetched")
public async getAllBooked(){
    try{
        const allBooked= await BookedByUser.find({relations:{booking:true,user:true},select:{
            id:true,
            user:{
                id:true,
                fullName:true,
                phoneNumber:true
            },
            booking:{
                id:true,
                bookingStatus:true,
                date:true,
                start_time:true,
                end_time:true,
            }
        }})
        this.setStatus(200)
        return ({data:allBooked})
    }
    catch(error){
        console.log("get all booked controller error", error)
        this.setStatus(500)
        return {message:"Internal server error"}
    }

}
}