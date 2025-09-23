import { verifyAdmin, verifyToken } from "../utils/token";
import { BookingDTO} from "../DTOs/booking.dto";
import { Booking } from "../models/booking.entity";
import { BookingServices } from '../services/booking.services';
import { Body, Controller, Delete, Get, Middlewares, Path, Post, Put, Request, Route, SuccessResponse, Tags } from "tsoa";
import { validationMiddleware } from "../utils/validator";
import User from "../models/user.entity";

@Route("booking")
@Tags("Booking")
export class BookingController extends Controller {
    /**
 * create a new booking
 * @param body booking data 
 * @returns booking response with booking details
 */
    @Post("/create")
    @SuccessResponse("201", "Booking created successfully")
    @Middlewares(verifyToken)
    @Middlewares(validationMiddleware(BookingDTO))
    public async createBooking(@Request() req:any, @Body() body: BookingDTO) {

        try {
           
            const startTime = new Date(body.start_time)
            const endTime = new Date(body.end_time)
            const date = new Date(body.date)
            console.log("all data of booking",date,startTime,endTime)
            if (startTime.getTime() === endTime.getTime()) {
                this.setStatus(400)
                return { message: "start time and end time cannot be same" }
            }
            if (startTime.getTime() > endTime.getTime()) {
                this.setStatus(400)
                return { message: "start time cannot be greater than end time" }
            }
            const existBooking = await Booking.createQueryBuilder("booking").where({ date: date }).andWhere({ start_time: startTime }).andWhere({ end_time: endTime }).getOne()
            if (existBooking) {
                this.setStatus(400)
                return { message: "booking already exist" }
            }
            const user= await User.findOneBy({id:req.userId})
            let IsAdmin=false
            if(user?.role=="admin"){
                IsAdmin=true
            }

            const booking = await BookingServices.createBooking(body,req.userId,IsAdmin)
            this.setStatus(201)
            return { message: "booking created successfully", data: booking }

        } catch (error) {
            console.log("booking controller error", error)
            this.setStatus(500)
            return { message: "internal server error" }
        }

    }
    /**
* get all bookings
* @returns all bookings
*/
    @Get("/all-bookings")
    @SuccessResponse("200", "Booking fetched successfully")
    // @Middlewares(verifyToken)
    public async getAllBooking() {
        try {
            const bookings = await Booking.find({relations:['user']})
            this.setStatus(200)
            return { message: "booking fetched successfully",bookings }
        } catch (error) {
            console.log("booking controller error", error)
            this.setStatus(500)
            return { message: "internal server error" }
        }
    }
    /***
     * get bookings by id
     * @params id
     * @returns booking by id
     */
    @Get("/get-booking/:id")
    @SuccessResponse("200", "Booking fetched successfully")
    @Middlewares(verifyToken)
    public async getBookingById(@Path() id: string) {
        try {
            const booking = await Booking.findOneBy({ id: id })
            if (!booking) {
                this.setStatus(404)
                return { message: "booking not found" }
            }
            this.setStatus(200)
            return { message: "booking fetched successfully", data: booking }
        } catch (error) {
            console.log("booking controller error", error)
            this.setStatus(500)
            return { message: "internal server error" }
        }
    }
    /**
     * update booking by id
     * @param id
     * @param body
     * @returns updated booking
     */
    @Put("/update-booking/:id")
    @SuccessResponse("200", "Booking updated successfully")
    @Middlewares(verifyToken, verifyAdmin)
    public async updateBooking(@Path() id: string, @Body() body: Partial<Booking>){
        try {
            const booking = await Booking.findOneBy({ id: id })
            if (!booking) {
                this.setStatus(400)
                return { message: "booking not found" }
            }
            const startTime= body.start_time?new Date(body.start_time):booking.start_time
            const endTime= body.end_time?new Date(body.end_time):booking.end_time
            const date= body.date? new Date(body.date):booking.date
            if (startTime.getTime() === endTime.getTime()) {
                this.setStatus(400)
                return { message: "start time and end time cannot be same" }
            }
             if (startTime.getTime() > endTime.getTime()) {
                this.setStatus(400)
                return { message: "start time cannot be greater than end time" }
            }
             const existBooking = await Booking.createQueryBuilder("booking").where({ date: date }).andWhere({ start_time: startTime }).andWhere({ end_time: endTime }).getOne()
            if (existBooking) {
                this.setStatus(400)
                return { message: "booking already exist" }
            }
            const updateBooking = await BookingServices.updateBooking(id,{
               ...body,
                start_time:startTime,
                end_time:endTime,
                date:date
            })
            if (!updateBooking) {
                this.setStatus(404)
                return { message: "booking not found" }
            }
            this.setStatus(200)
            return { message: "booking updated successfully", data: updateBooking }

        } catch (error) {
            console.log("update booking error", error)
            this.setStatus(500)
            return { message: "internal server error" }
        }
    }
    @Delete("/delete-booking/:id")
    @SuccessResponse("200", "Booking deleted successfully")
    @Middlewares(verifyToken, verifyAdmin)
    public async deleteBooking(@Path() id: string) {
        try {
            const booking = await Booking.findOneBy({ id: id })
            if (!booking) {
                this.setStatus(404)
                return { message: "booking not found" }
            }
           await BookingServices.deleteBooking(id)
            this.setStatus(200)
            return { message: "booking deleted successfully" }
        } catch (error) {
            console.log("delete booking error", error)
            this.setStatus(500)
            return { message: "internal server error" }
        }
    }
    
}