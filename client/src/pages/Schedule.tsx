import { useState, useEffect } from "react";
import { useFetch } from "../hooks/useFetch";
import { type BookingDTO } from "../DTOs/bookingDTO";
import { format, parseISO } from "date-fns";

interface Slot {
  id: string;
  start_time: string;
  end_time: string;
  status: string;
}

interface DaySchedule {
  day: string;
  date: string;
  slots: Slot[];
}

export default function Schedule() {
  const { data, loading, error } = useFetch<{ bookings: BookingDTO[] }>("/booking/all-bookings");
  const [schedule, setSchedule] = useState<DaySchedule[]>([]);

  // Process fetched bookings into schedule
  useEffect(() => {
    if (data?.bookings && Array.isArray(data.bookings)) {
      const tempSchedule: Record<string, DaySchedule> = {};

      data.bookings.forEach((booking) => {
        const dateKey = format(parseISO(booking.date), "yyyy-MM-dd");

        if (!tempSchedule[dateKey]) {
          tempSchedule[dateKey] = {
            day: format(parseISO(booking.date), "EEEE"),
            date: format(parseISO(booking.date), "dd MMM yyyy"),
            slots: [],
          };
        }

        tempSchedule[dateKey].slots.push({
          id: booking.id,
          start_time: format(parseISO(booking.start_time), "HH:mm"),
          end_time: format(parseISO(booking.end_time), "HH:mm"),
          status: booking.bookingStatus,
        });
      });

      setSchedule(Object.values(tempSchedule));
    }
  }, [data]);

  const handleBooking = (day: DaySchedule, slot: Slot) => {
    alert(`Booking requested for ${day.day} ${day.date}, ${slot.start_time} - ${slot.end_time}`);
    // TODO: Call API to create booking
  };

  if (loading)
    return (
      <div className="flex justify-center items-center py-10">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  if (error)
    return <p className="text-center py-10 text-red-600">Error loading schedule. Please try again.</p>;

  if (!schedule.length)
    return <p className="text-center py-10 text-gray-600">No bookings available.</p>;

  // Extract unique time slots for table rows
  const allTimeSlots = Array.from(
    new Set(schedule.flatMap(day => day.slots.map(slot => `${slot.start_time}-${slot.end_time}`)))
  ).sort();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-extrabold text-center mb-6">⚽ Weekly Schedule</h1>

      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="border p-2 text-left w-32">Time</th>
              {schedule.map((day, idx) => (
                <th key={idx} className="border p-2 text-center">
                  <div className="font-semibold">{day.day}</div>
                  <div className="text-xs text-gray-500">{day.date}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {allTimeSlots.map((timeRange, rowIdx) => (
              <tr key={rowIdx}>
                <td className="border p-2 font-semibold text-center bg-gray-50">{timeRange}</td>
                {schedule.map((day, colIdx) => {
                  const currentSlot = day.slots.find(
                    slot => `${slot.start_time}-${slot.end_time}` === timeRange
                  );
                  return (
                    <td key={colIdx} className="border p-2 text-center">
                      {currentSlot ? (
                        currentSlot.status === "booked" ? (
                          <span className="text-red-600 font-medium">Booked</span>
                        ) : (
                          <button
                            onClick={() => handleBooking(day, currentSlot)}
                            className="px-3 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600 transition"
                          >
                            Book
                          </button>
                        )
                      ) : (
                        <span className="text-gray-300">-</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
