import { useState, type FormEvent } from "react"
import { Button } from "@shadcn/components/ui/button"
import { Calendar } from "@shadcn/components/ui/calendar"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@shadcn/components/ui/dialog"
import { Clock, CalendarIcon } from "lucide-react"
import { Label } from "@shadcn/components/ui/label"
import { format } from "date-fns"
import type { BookingDTO } from "src/DTOs/bookingDTO"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@shadcn/components/ui/select"
import { timeSlots } from "../utils/timeSlots" // 24h format list: ["06:00","06:30",...,"21:00"]
import { Input } from "@shadcn/components/ui/input"

const CreateorEditBooking = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [openCalendar, setOpenCalendar] = useState(false)
  const [bookingData, setBookingData] = useState<BookingDTO>({
    start_time: "",
    end_time: "",
    date: "",
  })

  const formatTo12Hour = (time: string) => {
    const [h, m] = time.split(":").map(Number)
    const period = h >= 12 ? "PM" : "AM"
    const hour12 = h % 12 === 0 ? 12 : h % 12
    return `${hour12}:${m.toString().padStart(2, "0")} ${period}`
  }

    const handleAddOneHour=(time:string)=>{
    const [hours, minutes] = time.split(':').map(Number)
    let newHour= hours+1
     const period = newHour>= 12 ? "PM" : "AM"
     const hour12 = newHour% 12 === 0 ? 12 : newHour% 12
    if (newHour>23) newHour=0
    const value12= `${hour12}:${minutes.toString().padStart(2, '0')} ${period}`
    const value24 = `${newHour}`
    return {value12,value24}
  
  }

  // Handle start time selection
  const handleStartTime = (value: string) => {
    const {value12,value24}= handleAddOneHour(value)
    setBookingData((prev) => ({
      ...prev,
      start_time: value,
      end_time: value24, // reset end time when start changes
    }))
  }

  // Handle date selection
  const handleDateSelection = (date: Date) => {
    setSelectedDate(date)
    setBookingData((prev) => ({
      ...prev,
      date: date.toLocaleDateString(),
    }))
    setOpenCalendar(false)
  }

  // Handle form submit
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("Booking Data:", bookingData)
    // Call API here
  }

  return (
    <Dialog>
      {/* Trigger Button */}
      <DialogTrigger asChild>
        <Button className="bg-[#233769] hover:bg-[#1b2c54]">
          + Create Booking
        </Button>
      </DialogTrigger>

      {/* Popup Content */}
      <DialogContent className="sm:max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-center">
            Create Booking
          </DialogTitle>
        </DialogHeader>

        <form className="space-y-5 mt-4" onSubmit={handleSubmit}>
          {/* Start Time */}
          <div className="space-y-1">
            <Label htmlFor="start_time" className="text-sm font-medium">
              Start Time
            </Label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Select onValueChange={handleStartTime} value={bookingData.start_time}>
                <SelectTrigger className="pl-10 w-full">
                  <SelectValue placeholder="Select start time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        {formatTo12Hour(time)}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* End Time */}
          <div className="space-y-1">
            <Label htmlFor="end_time" className="text-sm font-medium">
              End Time
            </Label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
             <Input value={bookingData.end_time}/>
            </div>
          </div>

          {/* Booking Date */}
          <div className="space-y-1">
            <Label className="text-sm font-medium">Booking Date</Label>
            <Button
              type="button"
              variant="outline"
              className="w-full justify-start text-left font-normal"
              onClick={() => setOpenCalendar(true)}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {selectedDate ? format(selectedDate, "PPP") : "Select a date"}
            </Button>
            {openCalendar && (
              <div className="mt-2 border rounded-md shadow-sm">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelection}
                />
              </div>
            )}
          </div>

          {/* Actions */}
          <DialogFooter>
            <Button
              type="submit"
              className="w-full bg-[#233769] hover:bg-[#1b2c54]"
            >
              Create Booking
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateorEditBooking
