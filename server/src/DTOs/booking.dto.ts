
import { BookingStatus } from "../utils/status.enum"

export interface BookingDTO{
    start_time:string,
    end_time:string,
    date:string
}



export interface UpdateBookingDTO extends Partial<BookingDTO>{
    status?:BookingStatus
}


export interface BookedUserDTO{
 userId:string,
  bookingId:string
}
