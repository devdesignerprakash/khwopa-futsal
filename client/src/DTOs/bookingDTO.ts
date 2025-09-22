export interface BookingDTO {
id:string
  start_time: string;
  end_time: string;
  date: string;
  bookingStatus: string;
}
export interface BookingResponseDTO {
  id: string;
  start_time: string;
  end_time: string;
  date: string;
  bookingStatus: string;
}
export interface CreateorEditBookingDTO{
    start_time: string;
  end_time: string;
  date: string;
}
