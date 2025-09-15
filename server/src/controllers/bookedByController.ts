import { BookedByServices } from "../services/bookedBy.services";
import { BookedUserDTO } from "../DTOs/booking.dto";
import { Body, Controller, Middlewares, Post, Route, SuccessResponse, Tags } from "tsoa";
import { Booking } from "../models/booking.entity";
import { BookingStatus } from "../utils/status.enum";
import { verifyToken } from "../utils/token";

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
}