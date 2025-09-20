import { Button } from "@shadcn/components/ui/button";
import { Input } from "@shadcn/components/ui/input";
import {useState} from 'react'

const CreateorEditBooking = () => {
      const [date, setDate] = useState<Date | undefined>(undefined)
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-2xl p-6 space-y-6">
        <h1 className="text-2xl font-semibold text-center">Create Booking</h1>
        <form className="space-y-5">
          <div className="space-y-2">
            <Input
              type="time"
              id="start-time"
              step="1"
              defaultValue="10:00:00"
              className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden"
            />
          </div>

          <div className="space-y-2">
            <Input
              type="time"
              id="end-time"
              step="1"
              defaultValue="10:00:00"
              className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-center border rounded-lg p-2">
              
            </div>
          </div>

          <Button type="submit" className="w-full">
            Create Booking
          </Button>
        </form>
      </div>
     
    </div>
  );
};

export default CreateorEditBooking;
