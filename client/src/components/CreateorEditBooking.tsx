import { useState, type ChangeEvent, type FormEvent } from "react"
import { Button } from "@shadcn/components/ui/button"
import { Input } from "@shadcn/components/ui/input"
import { Calendar } from "@shadcn/components/ui/calendar"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@shadcn/components/ui/dialog"
import { Clock, Calendar as CalendarIcon } from "lucide-react"
import { Label } from "@shadcn/components/ui/label"
import { format } from "date-fns"
import type { BookingDTO } from "src/DTOs/bookingDTO"

const CreateorEditBooking = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [openCalendar, setOpenCalendar] = useState(false)
  const [bookingData,setBookingData]= useState<BookingDTO>({
    start_time:"",
    end_time:"",
    date:date.tolocaleString()|""

  })

  const handleTimeSelection=(e:ChangeEvent<HTMLInputElement>)=>{
   

  }
  const handleSubmit=(e:FormEvent<HTMLFormElement>)=>{


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

        <form className="space-y-5 mt-4">
          {/* Start Time */}
          <div className="space-y-1">
            <Label htmlFor="start-time" className="text-sm font-medium">
              Start Time
            </Label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input type="time" id="start-time" step="1" className="pl-10" onChange={handleTimeSelection}/>
            </div>
          </div>

          {/* End Time */}
          <div className="space-y-1">
            <Label htmlFor="end-time" className="text-sm font-medium">
              End Time
            </Label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input type="time" id="end-time" step="1" className="pl-10" />
            </div>
          </div>

          {/* Booking Date */}
          <div className="space-y-1">
            <Label className="text-sm font-medium">Booking Date</Label>

            {/* Date Trigger Button */}
            <Button
              type="button"
              variant="outline"
              className="w-full justify-start text-left font-normal"
              onClick={() => setOpenCalendar(true)}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {selectedDate ? format(selectedDate, "PPP") : "Select a date"}
            </Button>

            {/* Inline Dialog for Calendar */}
            {openCalendar && (
              <div className="mt-2 border rounded-md shadow-sm">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(d) => {
                    setSelectedDate(d)
                    setOpenCalendar(false) // close after selection
                  }}
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
