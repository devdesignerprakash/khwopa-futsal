import { Request } from "express";
import { BookedUserDTO } from "../DTOs/booking.dto";
import { BookedByUser } from "../models/bookedbyUser.entity"
import { Booking } from "../models/booking.entity";
import User from "../models/user.entity";
import { BookingStatus } from "../utils/status.enum";


export class BookedByServices {
    public static async createBooked(userId:string,data: BookedUserDTO) {
        const bookedUser = BookedByUser.create({
            user: { id:userId } as User,
            booking: { id: data.bookingId } as Booking,
        })
        await bookedUser.save()
       await Booking.update(data.bookingId, { bookingStatus: BookingStatus.PENDING });
        return bookedUser
    }
    public static async updateBookedStatus(id:string,status:BookingStatus){
        const updatedBooking= await Booking.update(id, { bookingStatus:status });
        return updatedBooking
    }
}