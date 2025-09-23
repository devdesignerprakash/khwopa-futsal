import User from "../models/user.entity";
import { BookingDTO, UpdateBookingDTO } from "../DTOs/booking.dto";
import { Booking } from "../models/booking.entity";

export class BookingServices {
    public static async createBooking(data: BookingDTO, userId: string, isAdmin: boolean) {
        let user: User | null = null

        if (!isAdmin) {
            if (data.phoneNumber) {
                // check if phoneNumber exists in DB
                const existingUser = await User.findOneBy({ phoneNumber: data.phoneNumber });
                user = existingUser ? existingUser : ({ id: userId } as User);
            } else {
                // no phoneNumber provided → use logged-in user
                user = { id: userId } as User;
            }
        }
        const newBooking = Booking.create({
            start_time: new Date(data.start_time),
            end_time: new Date(data.end_time),
            date: new Date(data.date),
            phoneNumber: data.phoneNumber,
            user: user
        })
        await newBooking.save()
        return newBooking;
    }
    public static async updateBooking(id: string, data: Partial<Booking>) {
        const booking = await Booking.findOneBy({ id: id })
        if (!booking) {
            return null
        }
        Object.assign(booking, data)
        await booking.save()
        return booking
    }
    public static async deleteBooking(id: string) {
        const booking = await Booking.findOneBy({ id: id })
        if (!booking) {
            return null
        }
        await booking.remove()
        return booking
    }



}