import { Button } from "@shadcn/components/ui/button"
import { Input } from "@shadcn/components/ui/input"
import { Textarea } from "@shadcn/components/ui/textarea"

const Contact = () => {
  return (
    <div className="w-full min-h-screen bg-[#FAFAFA] px-6 py-10">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-8 grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Left Section: Contact Form */}
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center md:text-left">Contact Us</h1>
          <form className="flex flex-col space-y-4">
            <Input placeholder="Your Name" />
            <Input placeholder="Email Address" type="email" />
            <Textarea placeholder="Your Message" rows="5" />
            <Button className="w-full md:w-fit self-center md:self-start">Submit</Button>
          </form>
        </div>

        {/* Right Section: Map */}
        <div className="rounded-lg overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3533.780952502328!2d85.41890797289896!3d27.662248074918775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1aa75fe01763%3A0xc1be62796d3c430c!2sKhwopa%20Futsal%20and%20Training%20Center!5e0!3m2!1sen!2snp!4v1756280843727!5m2!1sen!2snp"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-[400px] md:h-full"
          ></iframe>
        </div>

      </div>
    </div>

  )
}

export default Contact