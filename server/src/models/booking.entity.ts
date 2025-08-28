import { Column, Entity, OneToMany, OneToOne } from "typeorm";
import { BaseEntity } from "./base";
import { IsNotEmpty } from "class-validator";
import { BookedByUser } from "./bookedbyUser.entity";


export enum Status {
    NOT_BOOKED = 'not booked',
    CANCELLED = 'cancelled',
    COMPLETED = 'completed',
    PENDING = 'pending',
    APPROVED = 'approved',
}


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
            enum: Status,
            default: Status.NOT_BOOKED
        }
    )
    status: Status
    @OneToOne(() => BookedByUser, bookedByUser => bookedByUser.booking)
    bookedBy?: BookedByUser[];
}

