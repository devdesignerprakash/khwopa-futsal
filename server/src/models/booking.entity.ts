import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { BaseEntity } from "./base.entity";
import { IsNotEmpty } from "class-validator";
import { BookedByUser } from "./bookedbyUser.entity";
import { Status } from "../utils/status.enum";




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

