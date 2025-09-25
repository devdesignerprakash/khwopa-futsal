import User from "../models/user.entity";
import { BookingDTO, UpdateBookingDTO } from "../DTOs/booking.dto";
import { Booking } from "../models/booking.entity";
import { verify } from "crypto";

export class BookingServices {
    public static async createBooking(
        data: BookingDTO,
        userId: string | null,
        isAdmin: boolean,
        isUserVerified: boolean
    ) {
        let user: User | null = null;
        //FOR loggged n normal user
        if (!isAdmin && userId) {
            if (!isUserVerified) {
                return { message: "Please verify your email to book a slot" }
            }
            user = { id: userId } as User
        }


        // Case 2: Admin creating a booking
        if (isAdmin) {
            if (data.phoneNumber) {
                const existingUser = await User.findOneBy({ phoneNumber: data.phoneNumber });
                if (existingUser) {
                    user = ({ id: existingUser.id } as User)
                }
                user = null
            } else {
                // No phoneNumber → booking not tied to any user
                return { message: "Please Provide a Phone Number" }
            }
        }

        // Case 3: Guest (not logged in, not admin)
        if (!isAdmin && !userId) {
            if (data.phoneNumber) {
                const existingUser = await User.findOneBy({ phoneNumber: data.phoneNumber });
                if (existingUser) {
                    user = ({ id: existingUser.id } as User)
                }
                user = null;
            } else {
                // Guest without phone → reject booking
                return { message: "Phone number is required for guest booking" };
            }
        }

        const newBooking = Booking.create({
            start_time: new Date(data.start_time),
            end_time: new Date(data.end_time),
            date: new Date(data.date),
            phoneNumber: data.phoneNumber,
            user: user // may be null for admin or guest
        });

        await newBooking.save();
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