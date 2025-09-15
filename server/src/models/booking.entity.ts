import { Column, Entity, OneToOne } from "typeorm";
import { BaseEntity } from "./base.entity";
import { IsNotEmpty } from "class-validator";
import { BookedByUser } from "./bookedbyUser.entity";
import { BookingStatus } from "../utils/status.enum";

@Entity()
export class Booking extends BaseEntity {
    @IsNotEmpty({ message: 'Please provide a start time.' })
    @Column({ type: 'timestamp' })
    start_time: Date

    @IsNotEmpty({ message: 'Please provide a end time.' })
    @Column({ type: 'timestamp' })
    end_time: Date

    @IsNotEmpty({ message: 'Please provide a date.' })
    @Column({ type: 'timestamp' })
    date: Date


    @Column(
        {
            type: 'enum',
            enum: BookingStatus,
            default: BookingStatus.NOT_BOOKED
        }
    )
    bookingStatus: BookingStatus
    @OneToOne(() => BookedByUser, bookedByUser => bookedByUser.booking)
    bookedBy?: BookedByUser[];
}

