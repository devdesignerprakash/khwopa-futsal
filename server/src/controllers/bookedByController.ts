import { BookedByServices } from "../services/bookedBy.services";
import { BookedUserDTO, UpdateBookedStatusDTO, UpdateBookingDTO } from "../DTOs/booking.dto";
import { Body, Controller, Get, Middlewares, Path, Post, Put, Route, SuccessResponse, Tags } from "tsoa";
import { Booking } from "../models/booking.entity";
import { BookingStatus } from "../utils/status.enum";
import { verifyAdmin, verifyToken } from "../utils/token";
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
@Put("/update-status/{id}")
@SuccessResponse("200", "status updated")
@Middlewares(verifyToken,verifyAdmin)
public async updateBookingStatus(@Path()id:string,@Body()body:UpdateBookedStatusDTO){
    try{
        const booked= await BookedByUser.findOne({where:{id:id},relations:{booking:true},select:{booking:{id:true}}})
        console.log("booked",booked, "status",body.status)
        if(!booked){
            this.setStatus(404)
            return {message:"Booked doesn't exist"}
        }
        const booking= await Booking.findOne({where:{id:booked.booking.id}})
        if(!booking){
            this.setStatus(404)
            return {message:"Booking doesn't exist"}
        }
        const updatedBooking= await BookedByServices.updateBookedStatus(booked.booking.id,body.status)
        this.setStatus(200)
        return ({message:"booking status updated successfully"})

    }catch(error){
        console.log("update booking status controller error", error)
        this.setStatus(500)
        return {message:"Internal server error"}

    }
}

}