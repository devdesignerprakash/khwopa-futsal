"use client";

import { Button } from "@shadcn/components/ui/button";
import { Calendar, Users } from "lucide-react";
import CreateorEditBooking from "../components/CreateorEditBooking";

function AdminBooking() {
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
          Bookings Management
        </h1>
        <Button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Create Booking
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold text-gray-700">All Bookings</h2>
            <Users className="w-6 h-6 text-blue-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900">128</p>
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
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-gray-600 font-medium">#</th>
                <th className="px-4 py-2 text-gray-600 font-medium">Name</th>
                <th className="px-4 py-2 text-gray-600 font-medium">Date</th>
                <th className="px-4 py-2 text-gray-600 font-medium">Status</th>
                <th className="px-4 py-2 text-gray-600 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4].map((booking) => (
                <tr key={booking} className="border-b hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-2">#{booking}</td>
                  <td className="px-4 py-2">John Doe</td>
                  <td className="px-4 py-2">2025-09-20</td>
                  <td className="px-4 py-2">
                    <span className="px-2 py-1 rounded-full text-white bg-green-500 text-xs">
                      Confirmed
                    </span>
                  </td>
                  <td className="px-4 py-2 flex gap-2">
                    <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1">
                      Edit
                    </Button>
                    <Button size="sm" className="bg-red-500 hover:bg-red-600 text-white px-3 py-1">
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <CreateorEditBooking/>
    </div>
  );
}

export default AdminBooking;
