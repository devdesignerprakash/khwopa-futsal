"../utils/axiosInterceptor";
import type { BookingDTO } from "../DTOs/bookingDTO";
import { useFetch } from "../hooks/useFetch";
import { useState, useEffect } from "react";

// Helper to format YYYY-MM-DD in UTC
const formatDateUTC = (date: Date) => date.toISOString().split("T")[0];

// Helper to format time as "hh:mm AM/PM"
const formatTime = (timeStr: string) =>
  new Date(timeStr).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone:"UTC"
  });

export default function Bookings() {
  const [allBookings, setAllBookings] = useState<BookingDTO[]>([]);
  const { data } = useFetch<BookingDTO[]>("/booking/all-bookings");

  useEffect(() => {
    if (data) {
      // @ts-ignore
      setAllBookings(data.data);
    }
  }, [data]);

  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(formatDateUTC(today));
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // Group bookings by date in UTC
  const bookingsByDate: Record<string, BookingDTO[]> = {};
  allBookings.forEach((booking) => {
    const dateKey = formatDateUTC(new Date(booking.date));
    if (!bookingsByDate[dateKey]) bookingsByDate[dateKey] = [];
    bookingsByDate[dateKey].push(booking);
  });

  // Generate days of current month
  const firstDay = new Date (Date.UTC(currentYear, currentMonth, 1));
  const lastDay = new Date(Date.UTC(currentYear, currentMonth + 1, 0));

  const days = [];
  for (let d = new Date(firstDay); d <= lastDay; d.setDate(d.getDate() + 1)) {
    days.push(new Date(d));
  }

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };
  // const handleBooked=async()=>{
  //   const response= await api.post("/bookedBy/book",{
  //     bookingId:
  //     userId:

  //   })
  // }

  return (
    <div className="flex h-screen bg-gray-100 p-6 gap-6">
      {/* Left side: Calendar */}
      <div className="w-96 bg-white shadow-lg rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={handlePrevMonth}
            className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            ◀
          </button>
          <h2 className="text-xl font-bold">
            {new Date(currentYear, currentMonth).toLocaleString("default", {
              month: "long",
              year: "numeric",

            })}
          </h2>
          <button
            onClick={handleNextMonth}
            className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            ▶
          </button>
        </div>

        <div className="grid grid-cols-7 gap-2 text-center">
          {days.map((day) => {
            const dateStr = formatDateUTC(day);
            const isPast = day.getTime()< new Date().setHours(0,0,0);
            const isSelected = selectedDate === dateStr;

            return (
              <button
                key={dateStr}
                onClick={() => !isPast && setSelectedDate(dateStr)}
                disabled={isPast}
                className={`px-2 py-2 rounded-lg text-sm font-medium 
                  ${
                    isPast
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed opacity-50"
                      : isSelected
                      ? "bg-green-500 text-white"
                      : "bg-gray-100 text-gray-800 hover:bg-green-100"
                  }`}
              >
                {day.getDate()}
              </button>
            );
          })}
        </div>
      </div>

      {/* Right side: Timeslots */}
      <div className="flex-1 bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4">
          Available Times on{" "}
          <span className="text-green-600">
            {new Date(selectedDate).toDateString()}
          </span>
        </h2>

        <div className="flex flex-wrap gap-3">
          {bookingsByDate[selectedDate]?.length ? (
            bookingsByDate[selectedDate].map((booking) => {
              const time = formatTime(booking.start_time);
              const isBooked = booking.bookingStatus !== "not booked";

              return (
                <button
                  key={booking.id}
                  onClick={() => !isBooked && setSelectedTime(time)}
                  disabled={isBooked}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    selectedTime === time
                      ? "bg-green-500 text-white"
                      : isBooked
                      ? "bg-red-200 text-red-700 cursor-not-allowed"
                      : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                  }`}
                >
                  {time}
                </button>
              );
            })
          ) : (
            <p className="text-gray-500">No slots available for this date.</p>
          )}
        </div>

        {selectedTime && (
          <button className="mt-6 bg-green-500 text-white px-6 py-3 rounded-xl font-semibold text-lg">
            Book {selectedTime}
          </button>
        )}
      </div>
    </div>
  );
}
