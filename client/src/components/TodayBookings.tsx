import { useFetch } from "../hooks/useFetch"

function Bookings() {
  const response= useFetch("/booking/all-bookings")
  console.log(response)

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b bg-gray-50">
        <h1 className="font-bold text-2xl text-gray-800">Today's Bookings</h1>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs tracking-wider">
            <tr>
              <th className="px-6 py-3">Team Name</th>
              <th className="px-6 py-3">Start Time</th>
              <th className="px-6 py-3">End Time</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {TodayBookings.map((booking, index) => (
              <tr
                key={index}
                className="hover:bg-gray-50 transition duration-200"
              >
                <td className="px-6 py-4 font-medium text-gray-800">
                  {booking.teamName}
                </td>
                <td className="px-6 py-4">{booking.startTime}</td>
                <td className="px-6 py-4">{booking.endTime}</td>
                <td
                  className={`px-6 py-4 font-semibold ${
                    booking.status === "Booked"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {booking.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Bookings;

export const TodayBookings = [
  {
    id: 1,
    teamName: "Street Hawks",
    startTime: "06:00 AM",
    endTime: "07:00 AM",
    status: "Booked",
  },
  {
    id: 2,
    teamName: "Ball Busters",
    startTime: "07:00 AM",
    endTime: "08:00 AM",
    status: "Booked",
  },
  {
    id: 3,
    teamName: "Nepal Strikers",
    startTime: "08:00 AM",
    endTime: "09:00 AM",
    status: "Booked",
  },
  {
    id: 4,
    teamName: "Goal Diggers",
    startTime: "10:00 AM",
    endTime: "11:00 AM",
    status: "Booked",
  },
  {
    id: 5,
    teamName: "Kick Masters",
    startTime: "03:00 PM",
    endTime: "04:00 PM",
    status: "Booked",
  }
]