import { bookingDTO } from "../DTOs/booking.dto";
import { Booking } from "../models/booking.entity";

export class BookingServices{
    public static async createBooking(data:bookingDTO){
        console.log(new Date(data.start_time))
        const newBooking= Booking.create({
            start_time:new Date(data.start_time),
            end_time:new Date(data.end_time),
            date:new Date(data.date)
        })
        await newBooking.save()
        return newBooking;
    }

}