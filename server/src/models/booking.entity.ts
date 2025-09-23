import { Column, Entity, JoinColumn, ManyToOne} from "typeorm";
import { BaseEntity } from "./base.entity";
import { IsNotEmpty } from "class-validator";
import { BookingStatus } from "../utils/status.enum";
import User from "./user.entity";

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
            default: BookingStatus.PENDING
        }
    )
    bookingStatus: BookingStatus

   
    @ManyToOne(() => User, user =>user.bookings, {onDelete:"SET NULL"})
    @JoinColumn({name:'user_id'})
     user?: User |null;

    @Column({nullable:true})
    phoneNumber?:string
}

