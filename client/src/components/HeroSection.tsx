import { Button } from "@shadcn/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import CreateorEditBooking from "./CreateorEditBooking"



const HeroSection = () => {
  return (
    <div className="relative w-full max-w-7xl mx-auto rounded-lg overflow-hidden shadow-lg">
      <CreateorEditBooking/>
  {/* Image */}
  <img
    src="https://as1.ftcdn.net/v2/jpg/02/25/37/24/1000_F_225372455_WNn1Dnkl8DZlcvkfMY1EfdUNwU2YRd0o.jpg"
    alt="Sample"
    className="w-full h-100 object-cover"
  />

  {/* Left Button */}
  <Button
    className="absolute top-1/2 left-3 -translate-y-1/2 rounded-full bg-white/70 hover:bg-white shadow-md p-2"
  >
    <ChevronLeft className="w-5 h-5 text-gray-800" />
  </Button>

  {/* Right Button */}
  <Button
    className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full bg-white/70 hover:bg-white shadow-md p-2"
  >
    <ChevronRight className="w-5 h-5 text-gray-800" />
  </Button>
</div>

  )
}

export default HeroSection