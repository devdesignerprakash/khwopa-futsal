export interface BookingDTO{
    start_time:string,
    end_time:string,
     date:string,
}
export interface BookingResponseDTO{
    id:string
    start_time:string
    end_time:string
    date:string
    bookingStatus:string
}