"use client";
import { useEffect, useState } from "react";
import { Button } from "@shadcn/components/ui/button";
import { Calendar, Users } from "lucide-react";
import { useFetch } from "../hooks/useFetch";
import type { BookingResponseDTO } from "../DTOs/bookingDTO";
import CreateorEditBooking from "../components/CreateorEditBooking"; // Make sure this exists

function AdminBooking() {
  const { data, loading, error } = useFetch<{ message: string; bookings: BookingResponseDTO[] }>("/booking/all-bookings");

  const [allBookings, setAllBookings] = useState<BookingResponseDTO[]>([]);

  useEffect(() => {
    if (data?.bookings) {
      setAllBookings(data.bookings);
    }
  }, [data]);
  console.log(allBookings)

  const handleDelete = (id: string) => {
    // Replace this with API call to delete booking
    setAllBookings((prev) => prev.filter((booking) => booking.id !== id));
  };
const convertTime = (time: string) => {
  const date = new Date(time);
  return date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
};

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
          Bookings Management
        </h1>
        <CreateorEditBooking /> {/* Create booking form/button */}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold text-gray-700">All Bookings</h2>
            <Users className="w-6 h-6 text-blue-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{allBookings.length}</p>
          <p className="text-sm text-gray-500">Total bookings so far</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold text-gray-700">Recent Bookings</h2>
            <Calendar className="w-6 h-6 text-purple-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900">12</p>
          <p className="text-sm text-gray-500">Bookings in the last 7 days</p>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Booking List</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-gray-600">Id</th>
                <th className="px-4 py-2 text-left text-gray-600">Start Time</th>
                <th className="px-4 py-2 text-left text-gray-600">End Time</th>
                <th className="px-4 py-2 text-left text-gray-600">Date</th>
                <th className="px-4 py-2 text-left text-gray-600">Status</th>
                <th className="px-4 py-2 text-left text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {allBookings.map((booking, index) => (
                <tr key={booking.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm text-gray-700">{index + 1}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{convertTime(booking.start_time)}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{convertTime(booking.end_time)}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{new Date(booking.date).toLocaleDateString()}</td>

                  
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(
                        booking.bookingStatus
                      )}`}
                    >
                      {booking.bookingStatus}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <Button
                      size="sm"
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1"
                      onClick={() => handleDelete(booking?.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}

              {allBookings.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-gray-500">
                    No bookings found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminBooking;

// Helper to color-code statuses
function getStatusColor(status: string) {
  switch (status) {
    case "Confirmed":
      return "bg-green-500";
    case "Pending":
      return "bg-yellow-500";
    case "Cancelled":
      return "bg-red-500";
    default:
      return "bg-gray-400";
  }
}
