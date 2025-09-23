
import { IsDateString, IsNotEmpty, IsOptional, IsString } from "class-validator"
import { BookingStatus } from "../utils/status.enum"

export class BookingDTO{
    @IsNotEmpty({message:'you must provide start-time'})
    @IsDateString()
    start_time:string

     @IsNotEmpty({message:'you must provide end-time'})
     @IsDateString()
    end_time:string

    @IsNotEmpty({message:'you must provide date'})
    @IsDateString()
    date:string
    @IsOptional()
    phoneNumber?:string
}



export interface UpdateBookingDTO extends Partial<BookingDTO>{
    status?:BookingStatus
}


export interface BookedUserDTO{
  bookingId:string
}

export interface UpdateBookedStatusDTO{
    status:BookingStatus
}
