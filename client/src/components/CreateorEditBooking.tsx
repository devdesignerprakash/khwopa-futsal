import { useState, type FormEvent } from "react";
import { Button } from "@shadcn/components/ui/button";
import { Calendar } from "@shadcn/components/ui/calendar";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@shadcn/components/ui/dialog";
import { Clock, CalendarIcon } from "lucide-react";
import { Label } from "@shadcn/components/ui/label";
import {  type CreateorEditBookingDTO } from "../DTOs/bookingDTO";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@shadcn/components/ui/select";
import { timeSlots } from "../utils/timeSlots"; // ["06:00","06:30",...,"21:00"]
import { Input } from "@shadcn/components/ui/input";
import api from "../utils/axiosInterceptor";
import { convertTime } from "../utils/conversionTime";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const CreateorEditBooking = () => {
 
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [openCalendar, setOpenCalendar] = useState(false);
  const navigate= useNavigate()
  const [bookingData, setBookingData] = useState<CreateorEditBookingDTO>({
    start_time: "",
    end_time: "",
    date: "",
  });

  const [startTimeValue, setStartTimeValue] = useState<string>(""); // 24h for Select
  const [endTimeDisplay, setEndTimeDisplay] = useState<string>(""); // 12h for showing end time

  // Convert 24h to 12h for display
  const formatTo12Hour = (time: string) => {
    const [h, m] = time.split(":").map(Number);
    const period = h >= 12 ? "PM" : "AM";
    const hour12 = h % 12 === 0 ? 12 : h % 12;
    return `${hour12}:${m.toString().padStart(2, "0")} ${period}`;
  };

  // Handle Start Time Selection
 

const handleStartTime = (value24: string) => {
  if (!selectedDate) return; 

  const endHour = (+value24.split(":")[0] + 1) % 24;
  const endValue24 = `${endHour.toString().padStart(2, "0")}:${value24.split(":")[1]}`;

  setStartTimeValue(value24);
  setEndTimeDisplay(formatTo12Hour(endValue24));

  const formattedDate = format(selectedDate, "yyyy-MM-dd"); // consistent
  setBookingData({
    start_time: convertTime(value24, formattedDate),
    end_time: convertTime(endValue24, formattedDate),
    date: formattedDate,

  });
};

  // Handle Date Selection
  const handleDateSelection = (date: Date) => {
    setSelectedDate(date);
    setBookingData((prev) => ({
      ...prev,
      date: format(date, "yyyy-MM-dd"),
    }));
    setOpenCalendar(false);
  };

  // Submit Booking
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
   try{
     const response = await api.post("/booking/create", bookingData);
     if(response){
      toast.success(response.data.message)
      navigate(0)
     }

   }
    catch(err){
      toast.error(err?.response?.data?.message)
      console.log('create booking error',err)
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[#233769] hover:bg-[#1b2c54]">
          + Create Booking
        </Button>
      </DialogTrigger>

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
              <Select onValueChange={handleStartTime} value={startTimeValue}>
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
              <Input value={endTimeDisplay} className="pl-10" readOnly />
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
                  disabled={{before:new Date()}}
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
  );
};

export default CreateorEditBooking;
