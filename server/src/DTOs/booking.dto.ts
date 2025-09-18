
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
  bookingId:string
}

export interface UpdateBookedStatusDTO{
    status:BookingStatus
}
