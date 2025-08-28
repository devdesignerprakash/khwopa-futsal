import { Entity, ManyToOne, JoinColumn, OneToOne } from "typeorm";
import { BaseEntity } from "./base";
import { Booking } from "./booking.entity";
import { User } from "./user.entity";

@Entity()
export class BookedByUser extends BaseEntity {
@OneToOne(() => Booking, booking => booking.bookedBy)  // One-to-One instead!
@JoinColumn({ name: 'booking_id' })
booking: Booking;

@ManyToOne(() => User, user => user.bookings)
@JoinColumn({ name: 'user_id' })
user: User;
}
