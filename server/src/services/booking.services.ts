import { BookingDTO, UpdateBookingDTO } from "../DTOs/booking.dto";
import { Booking } from "../models/booking.entity";

export class BookingServices{
    public static async createBooking(data:BookingDTO){
        const newBooking= Booking.create({
            start_time:new Date(data.start_time),
            end_time:new Date(data.end_time),
            date:new Date(data.date)
        })
        await newBooking.save()
        return newBooking;
    }
    public static async updateBooking(id:string, data:Partial<Booking>){
        const booking= await Booking.findOneBy({id:id})
        if(!booking){
            return null
        }
        Object.assign(booking,data)
        await booking.save()
        return booking
    }
     

    

}