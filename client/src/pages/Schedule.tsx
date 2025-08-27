
import {useState,useEffect} from 'react';

export default function Schedule() {
  const [schedule, setSchedule] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);

  useEffect(() => {
    fetch("/schedule.json") // put JSON in public/ folder
      .then((res) => res.json())
      .then((data) => {
        setSchedule(data.schedule);

        // extract unique time slots (start-end) from first day
        if (data.schedule.length > 0) {
          setTimeSlots(data.schedule[0].slots.map(s => ({
            start_time: s.start_time,
            end_time: s.end_time
          })));
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const handleBooking = (day, slot) => {
    alert(`Booking requested for ${day.day} ${day.date}, ${slot.start_time} - ${slot.end_time}`);
    // here you can call API to update booking
  };

  return (
    <>
    <div className="p-6">
      <h1 className="text-2xl font-extrabold text-center mb-6">⚽️Weekly Schedule</h1>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="border p-2 text-left w-32">Time</th>
              {schedule.map((day, i) => (
                <th key={i} className="border p-2 text-center">
                  {day.day}
                  <div className="text-xs text-gray-500">{day.date}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timeSlots.map((slot, rowIdx) => (
              <tr key={rowIdx}>
                {/* Time column */}
                <td className="border p-2 font-semibold text-center bg-gray-50">
                  {slot.start_time} - {slot.end_time}
                </td>

                {/* Each day's slot */}
                {schedule.map((day, colIdx) => {
                  const currentSlot = day.slots[rowIdx];
                  return (
                    <td
                      key={colIdx}
                      className="border p-2 text-center"
                    >
                      {currentSlot.status === "booked" ? (
                        <span className="text-red-600 font-medium">Booked</span>
                      ) : (
                        <button
                          onClick={() => handleBooking(day, currentSlot)}
                          className="px-3 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600"
                        >
                          Book
                        </button>
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
    </>
  );
}


// export const ScheduleList=[
//     {
//       "day": "Monday",
//       "date": "2025-08-26",
//       "slots": [
//         { "start_time": "06:00", "end_time": "07:00", "status": "available" },
//         { "start_time": "07:00", "end_time": "08:00", "status": "booked", "team": "Street Kings" },
//         { "start_time": "08:00", "end_time": "09:00", "status": "booked", "team": "Goal Diggers" },
//         { "start_time": "09:00", "end_time": "10:00", "status": "available" },
//         { "start_time": "17:00", "end_time": "18:00", "status": "booked", "team": "United FC" },
//         { "start_time": "18:00", "end_time": "19:00", "status": "booked", "team": "Ballers" },
//         { "start_time": "19:00", "end_time": "20:00", "status": "available" },
//         { "start_time": "20:00", "end_time": "21:00", "status": "booked", "team": "Legends" }
//       ]
//     },
//     {
//       "day": "Tuesday",
//       "date": "2025-08-27",
//       "slots": [
//         { "start_time": "06:00", "end_time": "07:00", "status": "booked", "team": "Morning Kickers" },
//         { "start_time": "07:00", "end_time": "08:00", "status": "available" },
//         { "start_time": "08:00", "end_time": "09:00", "status": "available" },
//         { "start_time": "09:00", "end_time": "10:00", "status": "booked", "team": "Futsal Bros" },
//         { "start_time": "17:00", "end_time": "18:00", "status": "available" },
//         { "start_time": "18:00", "end_time": "19:00", "status": "booked", "team": "Power Strikers" },
//         { "start_time": "19:00", "end_time": "20:00", "status": "booked", "team": "Nepal United" },
//         { "start_time": "20:00", "end_time": "21:00", "status": "available" }
//       ]
//     },
//     {
//       "day": "Wednesday",
//       "date": "2025-08-28",
//       "slots": [
//         { "start_time": "06:00", "end_time": "07:00", "status": "available" },
//         { "start_time": "07:00", "end_time": "08:00", "status": "booked", "team": "Street Kings" },
//         { "start_time": "08:00", "end_time": "09:00", "status": "available" },
//         { "start_time": "09:00", "end_time": "10:00", "status": "booked", "team": "Legends" },
//         { "start_time": "17:00", "end_time": "18:00", "status": "booked", "team": "Goal Diggers" },
//         { "start_time": "18:00", "end_time": "19:00", "status": "available" },
//         { "start_time": "19:00", "end_time": "20:00", "status": "booked", "team": "Ballers" },
//         { "start_time": "20:00", "end_time": "21:00", "status": "booked", "team": "United FC" }
//       ]
//     },
//     {
//       "day": "Thursday",
//       "date": "2025-08-29",
//       "slots": [
//         { "start_time": "06:00", "end_time": "07:00", "status": "booked", "team": "Futsal Warriors" },
//         { "start_time": "07:00", "end_time": "08:00", "status": "available" },
//         { "start_time": "08:00", "end_time": "09:00", "status": "booked", "team": "Morning Kickers" },
//         { "start_time": "09:00", "end_time": "10:00", "status": "available" },
//         { "start_time": "17:00", "end_time": "18:00", "status": "booked", "team": "Nepal United" },
//         { "start_time": "18:00", "end_time": "19:00", "status": "available" },
//         { "start_time": "19:00", "end_time": "20:00", "status": "booked", "team": "Street Kings" },
//         { "start_time": "20:00", "end_time": "21:00", "status": "booked", "team": "Legends" }
//       ]
//     },
//     {
//       "day": "Friday",
//       "date": "2025-08-30",
//       "slots": [
//         { "start_time": "06:00", "end_time": "07:00", "status": "available" },
//         { "start_time": "07:00", "end_time": "08:00", "status": "booked", "team": "Goal Diggers" },
//         { "start_time": "08:00", "end_time": "09:00", "status": "booked", "team": "Ballers" },
//         { "start_time": "09:00", "end_time": "10:00", "status": "available" },
//         { "start_time": "17:00", "end_time": "18:00", "status": "booked", "team": "Legends" },
//         { "start_time": "18:00", "end_time": "19:00", "status": "booked", "team": "Power Strikers" },
//         { "start_time": "19:00", "end_time": "20:00", "status": "available" },
//         { "start_time": "20:00", "end_time": "21:00", "status": "booked", "team": "United FC" }
//       ]
//     },
//     {
//       "day": "Saturday",
//       "date": "2025-08-31",
//       "slots": [
//         { "start_time": "06:00", "end_time": "07:00", "status": "booked", "team": "Street Kings" },
//         { "start_time": "07:00", "end_time": "08:00", "status": "booked", "team": "Morning Kickers" },
//         { "start_time": "08:00", "end_time": "09:00", "status": "available" },
//         { "start_time": "09:00", "end_time": "10:00", "status": "available" },
//         { "start_time": "17:00", "end_time": "18:00", "status": "booked", "team": "Futsal Bros" },
//         { "start_time": "18:00", "end_time": "19:00", "status": "available" },
//         { "start_time": "19:00", "end_time": "20:00", "status": "booked", "team": "Nepal United" },
//         { "start_time": "20:00", "end_time": "21:00", "status": "booked", "team": "Ballers" }
//       ]
//     },
//     {
//       "day": "Sunday",
//       "date": "2025-09-01",
//       "slots": [
//         { "start_time": "06:00", "end_time": "07:00", "status": "available" },
//         { "start_time": "07:00", "end_time": "08:00", "status": "booked", "team": "Power Strikers" },
//         { "start_time": "08:00", "end_time": "09:00", "status": "available" },
//         { "start_time": "09:00", "end_time": "10:00", "status": "booked", "team": "United FC" },
//         { "start_time": "17:00", "end_time": "18:00", "status": "booked", "team": "Legends" },
//         { "start_time": "18:00", "end_time": "19:00", "status": "available" },
//         { "start_time": "19:00", "end_time": "20:00", "status": "booked", "team": "Goal Diggers" },
//         { "start_time": "20:00", "end_time": "21:00", "status": "booked", "team": "Street Kings" }
//       ]
//     }
// ]
