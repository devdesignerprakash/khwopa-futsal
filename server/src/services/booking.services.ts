import User from "../models/user.entity";
import { BookingDTO} from "../DTOs/booking.dto";
import { Booking } from "../models/booking.entity";
import { ApiError } from "../utils/apiError";



export class BookingServices {
  public static async createBooking(
    data: BookingDTO,
    userId: string | null,
    isAdmin: boolean,
    isUserVerified: boolean
) {
    let user: User | null = null;

    // Case 1: Logged-in normal user
    if (!isAdmin && userId) {
        if (!isUserVerified) {
           throw new ApiError(400, "User is not verified");
        }
        user = { id: userId } as User;
    }

    // Case 2: Admin creating booking → phone required
    if (isAdmin) {
        if (!data.phoneNumber) {
            throw new ApiError(400,"Phone number is required when admin creates a booking");
        }

        // check if phone belongs to an existing user
        const existingUser = await User.findOneBy({ phoneNumber: data.phoneNumber });
        if (existingUser) {
            user = { id: existingUser.id } as User;
        }
    }

    // Case 3: Guest (not logged in + not admin) → phone required
    if (!isAdmin && !userId) {
        if (!data.phoneNumber) {
            throw new ApiError(400, "Phone number is required for guest bookings");
        }

        const existingUser = await User.findOneBy({ phoneNumber: data.phoneNumber });
        if (existingUser) {
            user = { id: existingUser.id } as User;
        }
    }
    // Create booking
    const newBooking = Booking.create({
        start_time: new Date(data.start_time),
        end_time: new Date(data.end_time),
        date: new Date(data.date),
        phoneNumber: data.phoneNumber,
        user: user, // may be null (if admin/guest and phone not linked to user)
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