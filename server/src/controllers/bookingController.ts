import { verifyAdmin, verifyToken } from "../utils/token";
import { bookingDTO } from "../DTOs/booking.dto";
import { Booking } from "../models/booking.entity";
import { BookingServices } from '../services/booking.services';
import { Body, Controller, Get, Middlewares, Path, Post, Route, SuccessResponse, Tags } from "tsoa";




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
    @Middlewares(verifyToken,verifyAdmin)
    public async createBooking(@Body() body: bookingDTO) {

        try {
            const startTime= new Date(body.start_time)
            const endTime= new Date(body.end_time)
            const date= new Date(body.date)
           if(startTime.getTime()===endTime.getTime() ){
            this.setStatus(400)
            return {message:"start time and end time cannot be same"}
           }
           if(startTime.getTime()>endTime.getTime()){
            this.setStatus(400)
            return {message:"start time cannot be greater than end time"}
           }
            const existBooking = await Booking.createQueryBuilder("booking").where({ date: date }).andWhere({ start_time: startTime}).andWhere({ end_time: endTime }).getOne()
            if (existBooking) {
                this.setStatus(400)
                return { message: "booking already exist" }
            }
             const booking= await BookingServices.createBooking(body)

            this.setStatus(201)
            return { message: "booking created successfully", data:booking}

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
    @Middlewares(verifyToken)
    public async getAllBooking() {
        try {
            const bookings = await Booking.find()
            this.setStatus(200)
            return { message: "booking fetched successfully", data: bookings }
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
    
}