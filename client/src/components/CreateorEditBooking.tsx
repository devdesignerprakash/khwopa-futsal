import { useState } from "react";
import { Button } from "@shadcn/components/ui/button";
import { Input } from "@shadcn/components/ui/input";
import { Calendar } from "@shadcn/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@shadcn/components/ui/dialog";
import { Clock } from "lucide-react";
import { Label } from "@shadcn/components/ui/label";

const CreateorEditBooking = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);

  return (
    <Dialog>
      {/* Trigger Button */}
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700">
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
            <Label
              className="text-sm font-medium text-gray-700"
              htmlFor="start-time"
            >
              start Time
            </Label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input type="time" id="start-time" step="1" className="pl-10" />
            </div>
          </div>

          {/* End Time */}
          <div className="space-y-2">
            <label htmlFor="end-time" className="text-sm font-medium">
              End Time
            </label>
            <Input type="time" id="end-time" step="1" defaultValue="10:00:00" />
          </div>

          {/* Date Picker */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Booking Date</label>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border shadow-sm"
              captionLayout="dropdown"
            />
          </div>

          {/* Actions */}
          <DialogFooter>
            <Button type="submit" className="w-full">
              Create Booking
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateorEditBooking;
